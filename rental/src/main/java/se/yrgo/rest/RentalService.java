package se.yrgo.rest;

import org.springframework.stereotype.Service;
import se.yrgo.data.RentalRepository;
import se.yrgo.domain.Rental;

import java.util.List;
import java.util.Optional;

@Service
public class RentalService {

    private final RentalRepository rentalRepository;

    public RentalService(RentalRepository rentalRepository) {
        this.rentalRepository = rentalRepository;
    }

    public List<Rental> getAllRentals() {
        return rentalRepository.findAll();
    }

    public Optional<Rental> getRentalById(Long id) {
        return rentalRepository.findById(id);
    }

    public Rental createRental(Rental rental) {
        return rentalRepository.save(rental);
    }

    public Rental updateRental(Long id, Rental rental) {
        Optional<Rental> existingRental = rentalRepository.findById(id);
        if (existingRental.isPresent()) {
            rental.setId(id);
            return rentalRepository.save(rental);
        }
        throw new RuntimeException("Rental not found");
    }

    public void deleteRental(Long id) {
        rentalRepository.deleteById(id);
    }
}
