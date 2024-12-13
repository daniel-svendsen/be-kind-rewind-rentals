package se.yrgo.service;

import org.springframework.stereotype.Service;
import se.yrgo.data.RentalRepository;
import se.yrgo.domain.Rental;
import se.yrgo.domain.RentalItem;
import se.yrgo.messaging.RentalProducer;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class RentalServiceImpl implements RentalService {

    private final RentalRepository rentalRepository;
    private final RentalProducer rentalProducer;

    public RentalServiceImpl(RentalRepository rentalRepository, RentalProducer rentalProducer) {
        this.rentalRepository = rentalRepository;
        this.rentalProducer = rentalProducer;
    }

    @Override
    public List<Rental> getAllRentals() {
        return rentalRepository.findAll();
    }

    @Override
    public Optional<Rental> getRentalById(Long id) {
        return rentalRepository.findById(id);
    }

    @Override
    public Rental createRental(Long customerId, Long movieId) {
        // Skapa en ny uthyrning
        Rental rental = new Rental();
        rental.setCustomerId(customerId);
        rental.setRentalDate(LocalDate.now());
        rental.setReturnDate(LocalDate.now().plusDays(7)); // Sätter returnDate till 7 dagar senare
        rental.setTotalCost(100.0); // Standardpris

        // Skapa en ny RentalItem
        RentalItem item = new RentalItem();
        item.setProductId(movieId);
        item.setQuantity(1);
        item.setPrice(100.0);

        item.setRental(rental);
        rental.setRentalItems(List.of(item));

        Rental savedRental = rentalRepository.save(rental);

        // Skicka meddelande till ActiveMQ
        String message = String.format("Rental created: Customer ID %d, Movie ID %d, Rental ID %d",
                customerId, movieId, savedRental.getId());
        rentalProducer.sendMessage("rental.queue", message);

        return savedRental;
    }

    @Override
    public void endRental(Long rentalId) {
        if (rentalRepository.existsById(rentalId)) {
            rentalRepository.deleteById(rentalId);
        } else {
            throw new RuntimeException("Rental with ID " + rentalId + " not found.");
        }
    }

    @Override
    public Rental updateRental(Long id, Rental rental) {
        Optional<Rental> existingRental = rentalRepository.findById(id);
        if (existingRental.isPresent()) {
            rental.setId(id);
            return rentalRepository.save(rental);
        }
        throw new RuntimeException("Rental not found");
    }

    @Override
    public void deleteRental(Long id) {
        if (rentalRepository.existsById(id)) {
            rentalRepository.deleteById(id);
        } else {
            throw new RuntimeException("Rental with ID " + id + " not found.");
        }
    }
}
