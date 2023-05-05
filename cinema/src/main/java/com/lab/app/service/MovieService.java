package com.lab.app.service;

import com.lab.app.controller.exception.MovieNotFoundException;
import com.lab.app.dto.*;
import com.lab.app.repository.MovieRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigInteger;
import java.sql.Timestamp;
import java.util.*;

@Service
@RequiredArgsConstructor
public class MovieService {
    @PersistenceContext
    private EntityManager entityManager;
    private final MovieRepository repository;

//   @Cacheable("movies")
//    @Transactional
//    public List<MovieDTO> getAllMovies() {
//        return repository.getAllMoviesWithGenres();
//    }

    @Cacheable("movies")
    @Transactional(readOnly = true)
    public List<MovieDTO> getAllMovies() {
        String sql = "SELECT m.id, m.description, m.duration, m.poster_url," +
                " m.rating, m.release_date, m.title, m.trailer_url, m.age_limit," +
                " m.wide_poster_url, m.start_show_date, m.end_show_date," +
                " m.movie_picture_url, g.id, g.name" +
                " FROM cinema.movie m " +
                " JOIN cinema.movie_genre mg ON m.id = mg.movie_id " +
                " JOIN cinema.genre g ON mg.genre_id = g.id";
        Query query = entityManager.createNativeQuery(sql);
        List<Object[]> results = query.getResultList();
        Map<Long, MovieDTO> movieDTOMap = new HashMap<>();

        for (Object[] result : results) {
            Long movieId = ((Number) result[0]).longValue();

            if (!movieDTOMap.containsKey(movieId)) {
                String description = (String) result[1];
                Integer duration = ((Number) result[2]).intValue();
                String posterUrl = (String) result[3];
                Float rating = ((Number) result[4]).floatValue();
                Timestamp releaseDate = (Timestamp) result[5];
                String title = (String) result[6];
                String trailerUrl = (String) result[7];
                Integer ageLimit = ((Number) result[8]).intValue();
                String widePosterUrl = (String) result[9];
                Timestamp startShowDate = (Timestamp) result[10];
                Timestamp endShowDate = (Timestamp) result[11];

                Set<GenreDTO> genres = new HashSet<>();
                movieDTOMap.put(movieId, new MovieDTO(movieId, description, duration, posterUrl,
                        rating, releaseDate, title, trailerUrl, ageLimit, widePosterUrl,
                        startShowDate, endShowDate, genres));
            }

            Long genreId = ((Number) result[13]).longValue();
            String genreName = (String) result[14];
            movieDTOMap.get(movieId).genres().add(new GenreDTO(genreId, genreName));
        }

        return new ArrayList<>(movieDTOMap.values());
    }

//    @Cacheable(value = "movie", key = "#id")
//    @Transactional
//    public Movie getMovieById(Long id) {
//        return repository
//                .findById(id)
//                .orElseThrow(() -> new MovieNotFoundException(id));
//    }

    @Cacheable(value = "movie", key = "#id")
    @Transactional(readOnly = true)
    public MovieFullDTO getMovieById(Long id) {
        String movieSql = "SELECT m.id, m.description, m.duration, m.poster_url," +
                " m.rating, m.release_date, m.title, m.trailer_url, m.age_limit," +
                " m.wide_poster_url, m.start_show_date, m.end_show_date" +
                " FROM cinema.movie m " +
                " WHERE m.id = :id";
        Query movieQuery = entityManager.createNativeQuery(movieSql);
        movieQuery.setParameter("id", id);
        Object[] movieResult = (Object[]) movieQuery.getSingleResult();

        String assocSql = "SELECT g.id, g.name, a.id, a.name, a.surname, d.id, d.name, d.surname, s.id, s.start_time, s.end_time, c.id" +
                " FROM cinema.movie m " +
                " LEFT JOIN cinema.movie_genre mg ON m.id = mg.movie_id " +
                " LEFT JOIN cinema.genre g ON mg.genre_id = g.id" +
                " LEFT JOIN cinema.actor_movie am on m.id = am.movie_id " +
                " LEFT JOIN cinema.actor a ON a.id = am.actor_id" +
                " LEFT JOIN cinema.director_movie dm ON dm.movie_id = m.id " +
                " LEFT JOIN cinema.director d ON d.id = dm.director_id " +
                " LEFT JOIN cinema.showtime s ON m.id = s.movie_id " +
                " LEFT JOIN cinema.cinema_hall ch ON s.cinema_hall_id = ch.id " +
                " LEFT JOIN cinema.cinema c ON ch.cinema_id = c.id" +
                " WHERE m.id = :id";
        Query assocQuery = entityManager.createNativeQuery(assocSql);
        assocQuery.setParameter("id", id);
        List<Object[]> assocResults = assocQuery.getResultList();

        if (movieResult == null) {
            throw new MovieNotFoundException(id);
        }

        MovieFullDTO movieFullDTO = new MovieFullDTO(
                (Long) movieResult[0],
                (String) movieResult[1],
                (Integer) movieResult[2],
                (String) movieResult[3],
                (Float) movieResult[4],
                (Timestamp) movieResult[5],
                (String) movieResult[6],
                (String) movieResult[7],
                (Short) movieResult[8],
                (String) movieResult[9],
                (Timestamp) movieResult[10],
                (Timestamp) movieResult[11],
                new HashSet<>(),
                new HashSet<>(),
                new HashSet<>(),
                new HashSet<>()
        );

        for (Object[] assocResult : assocResults) {
            if (assocResult[0] != null) {  // genre
                GenreDTO genreDTO = new GenreDTO((Long) assocResult[0], (String) assocResult[1]);
                movieFullDTO.genres().add(genreDTO);
            }
            if (assocResult[2] != null) {  // actor
                ActorDTO actorDTO = new ActorDTO((Long) assocResult[2], (String) assocResult[3], (String) assocResult[4]);
                movieFullDTO.actors().add(actorDTO);
            }
            if (assocResult[5] != null) {  // director
                DirectorDTO directorDTO = new DirectorDTO((Long) assocResult[5], (String) assocResult[6], (String) assocResult[7]);
                movieFullDTO.directors().add(directorDTO);
            }
            if (assocResult[8] != null) {  // director
                ShowtimeDTO showtimeDTO = new ShowtimeDTO((Long) assocResult[8], (Timestamp) assocResult[9], (Timestamp) assocResult[10], (Long) assocResult[11]);
                movieFullDTO.showtimes().add(showtimeDTO);
            }
        }
        return movieFullDTO;
    }
}



