package se.yrgo;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import se.yrgo.data.RentalRepository;
import se.yrgo.domain.Rental;
import se.yrgo.rest.RentalService;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class RentalServiceTest {

    @Test
    void testCreateRental() {
        RentalRepository mockRepo = Mockito.mock(RentalRepository.class);
        RentalService service = new RentalService(mockRepo);

        Rental rental = new Rental();
        rental.setCustomerId(123L);
        rental.setTotalCost(100.0);

        when(mockRepo.save(any(Rental.class))).thenReturn(rental);

        Rental createdRental = service.createRental(rental);
        assertEquals(123L, createdRental.getCustomerId());
        assertEquals(100.0, createdRental.getTotalCost());
    }

    @Test
    void testGetRentalById() {
        RentalRepository mockRepo = Mockito.mock(RentalRepository.class);
        RentalService service = new RentalService(mockRepo);

        Rental rental = new Rental();
        rental.setId(1L);
        rental.setCustomerId(123L);

        when(mockRepo.findById(1L)).thenReturn(Optional.of(rental));

        Optional<Rental> result = service.getRentalById(1L);
        assertTrue(result.isPresent());
        assertEquals(123L, result.get().getCustomerId());
    }
}
