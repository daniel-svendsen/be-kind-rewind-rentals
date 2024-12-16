package se.yrgo.domain;

import jakarta.persistence.*;

@Entity
public class MovieInventory {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "movieId", nullable = false)
    private Movie movie;
    private int stock;


    public MovieInventory() {

    }

    public MovieInventory(Movie movie, int stock) {
        this.movie = movie;
        this.stock = stock;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Movie getMovie() {
        return movie;
    }

    public void setMovie(Movie movie) {
        this.movie = movie;
    }

    public int getStock() {
        return stock;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }


    @Override
    public String toString() {
        return "MovieInventory{" +
                "id=" + id +
                ", movie=" + movie +
                ", stock=" + stock +
                '}';
    }
}
