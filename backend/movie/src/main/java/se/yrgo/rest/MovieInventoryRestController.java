package se.yrgo.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import se.yrgo.domain.MovieInventory;
import se.yrgo.service.InventoryService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/inventory")
public class MovieInventoryRestController {
    @Autowired
    private InventoryService inventoryService;

    @GetMapping
    public ResponseEntity<List<MovieInventory>> getAllInventory() {
        return new ResponseEntity<>(inventoryService.getAllInventory(), HttpStatus.OK);
    }

    @GetMapping("/id")
    public ResponseEntity<MovieInventory> getInventoryById(@PathVariable Long id) {
        Optional<MovieInventory> inventory = inventoryService.getInventoryById(id);
        return inventory.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<?> addToInventory(@RequestParam Long movieId, @RequestParam int stock) {
        try {
            MovieInventory newInventory = inventoryService.addToInventory(movieId, stock);
            return new ResponseEntity<>(newInventory, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteInventory(@PathVariable Long id) {
        try {
            inventoryService.deleteInventory(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
}
