package se.yrgo.service;

import se.yrgo.domain.MovieInventory;

import java.util.List;
import java.util.Optional;

public interface InventoryService {
    public List<MovieInventory> getAllInventory();
    public Optional<MovieInventory> getInventoryById(Long id);
    public MovieInventory addToInventory(Long movieId, int stock);
    public void deleteInventory(Long id);
}
