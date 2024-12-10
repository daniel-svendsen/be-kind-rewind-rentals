package se.yrgo.service;

import org.springframework.stereotype.Service;
import se.yrgo.data.MovieRepository;
import se.yrgo.domain.Movie;

import java.util.List;

@Service
public class MovieServiceImpl implements MovieService {
    private final MovieRepository movieRepository;

    public MovieServiceImpl(MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
    }

    @Override
    public List<Movie> getAllMovies() {
        return movieRepository.findAll();
    }

    @Override
    public Movie createMovie(Movie movie) {
        return movieRepository.save(movie);
    }
}
