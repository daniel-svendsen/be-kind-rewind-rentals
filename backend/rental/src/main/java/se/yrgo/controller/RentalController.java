package se.yrgo.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import se.yrgo.domain.Rental;
import se.yrgo.domain.RentalItem;
import se.yrgo.dto.RentalDTO;
import se.yrgo.dto.RentalItemDTO;
import se.yrgo.messaging.RentalProducer;
import se.yrgo.rest.RentalService;

import java.util.List;

@RestController
@RequestMapping("/rentals")
public class RentalController {

    private final RentalService rentalService;
    private final RentalProducer rentalProducer;

    public RentalController(RentalService rentalService, RentalProducer rentalProducer) {
        this.rentalService = rentalService;
        this.rentalProducer = rentalProducer;
    }

    @GetMapping
    public List<Rental> getAllRentals() {
        return rentalService.getAllRentals();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Rental> getRentalById(@PathVariable Long id) {
        return rentalService.getRentalById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

//    @PostMapping
//    public Rental createRental(@RequestBody Rental rental) {
//        rental.getRentalItems().forEach(item -> {
//            // Sätt referensen till Rental för varje RentalItem
//            item.setRental(rental);
//
//            // Kontrollera att priset inte är null
//            if (item.getPrice() == null) {
//                throw new IllegalArgumentException("Price for rental item cannot be null");
//            }
//        });
//
//        Rental createdRental = rentalService.createRental(rental);
//        rentalProducer.sendMessage("rental.queue", "New rental created with ID: " + createdRental.getId());
//        return createdRental;
//    }

    @PostMapping
    public RentalDTO createRental(@RequestBody Rental rental) {
        try {
            rental.getRentalItems().forEach(item -> {
                item.setRental(rental);
                if (item.getPrice() == null) {
                    throw new IllegalArgumentException("Price for rental item cannot be null");
                }
            });

            Rental createdRental = rentalService.createRental(rental);
            rentalProducer.sendMessage("rental.queue", "New rental created with ID: " + createdRental.getId());

            return convertToDTO(createdRental);
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid rental data: " + e.getMessage());
        }
    }

    private RentalDTO convertToDTO(Rental rental) {
        RentalDTO rentalDTO = new RentalDTO();
        rentalDTO.setId(rental.getId());
        rentalDTO.setCustomerId(rental.getCustomerId());
        rentalDTO.setRentalDate(rental.getRentalDate());
        rentalDTO.setReturnDate(rental.getReturnDate());
        rentalDTO.setTotalCost(rental.getTotalCost());

        List<RentalItemDTO> itemDTOs = rental.getRentalItems().stream()
                .map(item -> {
                    RentalItemDTO itemDTO = new RentalItemDTO();
                    itemDTO.setProductId(item.getProductId());
                    itemDTO.setQuantity(item.getQuantity());
                    itemDTO.setPrice(item.getPrice());
                    return itemDTO;
                })
                .toList();

        rentalDTO.setRentalItems(itemDTOs);
        return rentalDTO;
    }

    @PutMapping("/{id}")
    public ResponseEntity<Rental> updateRental(@PathVariable Long id, @RequestBody Rental rental) {
        try {
            return ResponseEntity.ok(rentalService.updateRental(id, rental));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRental(@PathVariable Long id) {
        rentalService.deleteRental(id);
        return ResponseEntity.noContent().build();
    }
}
