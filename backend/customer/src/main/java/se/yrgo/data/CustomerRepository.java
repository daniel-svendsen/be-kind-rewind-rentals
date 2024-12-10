package se.yrgo.data;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.*;
import se.yrgo.domain.*;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {
}
