package se.yrgo.dto;

import java.time.LocalDate;
import java.util.List;

public class RentalDTO {
    private Long id;
    private Long customerId;
    private LocalDate rentalDate;
    private LocalDate returnDate;
    private Double totalCost;

    // Lägg till endast de fält som behövs från RentalItem
    private List<RentalItemDTO> rentalItems;

    public void setId(Long id) {
        this.id = id;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    public void setRentalDate(LocalDate rentalDate) {
        this.rentalDate = rentalDate;
    }

    public void setReturnDate(LocalDate returnDate) {
        this.returnDate = returnDate;
    }

    public void setTotalCost(Double totalCost) {
        this.totalCost = totalCost;
    }

    public void setRentalItems(List<RentalItemDTO> rentalItems) {
        this.rentalItems = rentalItems;
    }

    public Long getId() {
        return id;
    }

    public Long getCustomerId() {
        return customerId;
    }

    public LocalDate getRentalDate() {
        return rentalDate;
    }

    public LocalDate getReturnDate() {
        return returnDate;
    }

    public Double getTotalCost() {
        return totalCost;
    }

    public List<RentalItemDTO> getRentalItems() {
        return rentalItems;
    }
// Getters och setters
}

