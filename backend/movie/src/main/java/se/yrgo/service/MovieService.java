package se.yrgo.service;

import se.yrgo.domain.Movie;

import java.util.List;

public interface MovieService {
    List<Movie> getAllMovies();

    public Movie createMovie(Movie movie);
}
