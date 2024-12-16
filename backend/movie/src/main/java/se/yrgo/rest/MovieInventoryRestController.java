package se.yrgo.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import se.yrgo.data.MovieInventoryRepository;
import se.yrgo.data.MovieRepository;
import se.yrgo.domain.Movie;
import se.yrgo.domain.MovieInventory;

import java.util.Optional;

@RestController
@RequestMapping("/inventory")
public class MovieInventoryRestController {
    @Autowired
    private MovieInventoryRepository data;

    @Autowired
    private MovieRepository movieRepository;

    @GetMapping
    public ResponseEntity<?> getAllInventory() {
        return new ResponseEntity<>(data.findAll(), HttpStatus.OK);
    }

    @GetMapping("/id")
    public ResponseEntity<?> getInventoryById(@PathVariable Long id) {
        Optional<MovieInventory> inventory = data.findById(id);
        return inventory.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<?> addToInventory(@RequestParam Long movieId, @RequestParam int stock) {
        Optional<Movie> movie = movieRepository.findById(movieId);
        if(movie.isPresent()) {
            MovieInventory newInventory = new MovieInventory(movie.get(), stock);
            data.save(newInventory);
            return new ResponseEntity<>(newInventory, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(movie, HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteInventory(@PathVariable Long id) {
        if (data.existsById(id)) {
            data.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
