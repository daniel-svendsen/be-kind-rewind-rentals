package se.yrgo.data;

import org.springframework.data.jpa.repository.JpaRepository;
import se.yrgo.domain.Rental;

public interface RentalRepository extends JpaRepository<Rental, Long> {
}
