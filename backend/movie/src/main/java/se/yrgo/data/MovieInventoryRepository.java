package se.yrgo.data;

import org.springframework.data.jpa.repository.JpaRepository;
import se.yrgo.domain.MovieInventory;

public interface MovieInventoryRepository extends JpaRepository<MovieInventory, Long> {

}
