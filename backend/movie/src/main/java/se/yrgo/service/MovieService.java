package se.yrgo.service;

import se.yrgo.domain.Movie;

import java.util.List;
import java.util.Optional;

public interface MovieService {
    List<Movie> getAllMovies();
    Optional<Movie> getMovieById(Long id);
    public Movie createMovie(Movie movie);
    public Movie updateMovie(Long id, Movie updatedMovie);
    public void deleteMovie(Long id);
    List<Movie> searchMoviesByTitle(String title);
    List<Movie> searchMoviesByGenre(String genre);
    List<Movie> searchMovieByReleaseYear(int releaseYear);
}
