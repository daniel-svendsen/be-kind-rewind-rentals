package se.yrgo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import se.yrgo.data.MovieInventoryRepository;
import se.yrgo.data.MovieRepository;
import se.yrgo.domain.Movie;
import se.yrgo.domain.MovieInventory;

import java.util.List;
import java.util.Optional;

@Service
public class InventoryServiceImpl implements InventoryService{
    @Autowired
    private MovieInventoryRepository inventoryRepository;

    @Autowired
    private MovieRepository movieRepository;

    @Override
    public List<MovieInventory> getAllInventory() {
        return inventoryRepository.findAll();
    }

    @Override
    public Optional<MovieInventory> getInventoryById(Long id) {
        return inventoryRepository.findById(id);
    }

    @Override
    public MovieInventory addToInventory(Long movieId, int stock) {
        Optional<Movie> movie = movieRepository.findById(movieId);
        if (movie.isPresent()) {
            MovieInventory newInventory = new MovieInventory(movie.get(), stock);
            return inventoryRepository.save(newInventory);
        }
        throw new RuntimeException("Movie not found with ID: " + movieId);
    }

    @Override
    public void deleteInventory(Long id) {
        if (inventoryRepository.existsById(id)) {
            inventoryRepository.deleteById(id);
        } else {
            throw new RuntimeException("Inventory not found with ID: " + id);
        }
    }
}
