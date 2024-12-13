package se.yrgo.service;

import org.springframework.stereotype.Service;
import se.yrgo.data.RentalRepository;
import se.yrgo.domain.Rental;
import se.yrgo.domain.RentalItem;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class RentalServiceImpl implements RentalService {

    private final RentalRepository rentalRepository;

    public RentalServiceImpl(RentalRepository rentalRepository) {
        this.rentalRepository = rentalRepository;
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
        rental.setTotalCost(100.0); // Standardpris

        // Skapa en ny RentalItem
        RentalItem item = new RentalItem();
        item.setProductId(movieId);
        item.setQuantity(1);
        item.setPrice(100.0);

        // Koppla ihop RentalItem med Rental
        item.setRental(rental);
        rental.setRentalItems(List.of(item));

        // Spara uthyrningen
        return rentalRepository.save(rental);
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
