package com.lab.app.repository;

import com.lab.app.entity.Movie;
import com.lab.app.entity.Showtime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


public interface MovieRepository extends JpaRepository<Movie, Long> {

   //TODO: Need to refactor to MovieDTO using new package.DTO style
    @Query("select distinct m from Movie m " +
            "left join fetch m.genres " +
            " left join fetch m.genres" +
            " left join fetch m.directors " +
            "left join fetch m.actors")
    List<Movie> findAll();
    @Query("select distinct s from  Showtime s " +
            "left join fetch s.cinemaHall ch " +
            "left join fetch s.movie m" +
            " left join fetch m.genres" +
            " left join fetch m.directors " +
            " left join fetch m.actors" +
            " left join fetch s.bookings b " +
            " left join fetch b.seats" +
            " left join fetch ch.cinema where s.movie.id =?1")
    List<Showtime> findMovie(Long id);

//    // WHy doesn't it work
//    @Query("""
//        select new com.lab.app.dto.MovieDTO(m.id, m.description, m.duration, m.posterURL,
//        m.rating, m.releaseDate, m.title, m.trailerURL, m.ageLimit, m.widePosterURL,
//        m.startShowDate, m.endShowDate,
//        (
//            select new com.lab.app.dto.GenreDTO(g.id, g.name)
//            from Genre g
//            join g.movies gm
//            where gm.id = m.id
//        )
//        )
//        from Movie m
//    """)
//    List<MovieDTO> getAllMoviesWithGenres();

}
