package se.yrgo.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;

public class RentalItemDTO {
    private Long productId;
    private Integer quantity;
    private Double price;

    @JsonIgnore
    private RentalDTO rental;

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public RentalDTO getRental() {
        return rental;
    }

    public void setRental(RentalDTO rental) {
        this.rental = rental;
    }
}
