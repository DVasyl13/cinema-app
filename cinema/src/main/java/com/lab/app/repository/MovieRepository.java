package com.lab.app.repository;

import com.lab.app.entity.Movie;
import com.lab.app.entity.Showtime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


public interface MovieRepository extends JpaRepository<Movie, Long> {
    @Query("select distinct m from Movie m " +
            "left join fetch m.genres " +
            " left join fetch m.genres" +
            " left join fetch m.directors " +
            "left join fetch m.actors")
    List<Movie> findAll();

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
