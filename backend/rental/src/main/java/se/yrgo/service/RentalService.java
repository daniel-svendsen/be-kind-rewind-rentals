package se.yrgo.service;

import se.yrgo.domain.Rental;

import java.util.List;
import java.util.Optional;

public interface RentalService {
    List<Rental> getAllRentals();

    Optional<Rental> getRentalById(Long id);

    Rental createRental(Long customerId, Long movieId);

    void endRental(Long rentalId);

    Rental updateRental(Long id, Rental rental);

    void deleteRental(Long id);
}
