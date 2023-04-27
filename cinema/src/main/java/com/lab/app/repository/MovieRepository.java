package com.lab.app.repository;

import com.lab.app.entity.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;


public interface MovieRepository extends JpaRepository<Movie, Long> {
    @Override
    @Query("select m " +
            "from Movie m" +
            " left join fetch m.genres g" +
            " left join fetch m.showtimeList sh" +
            " left join fetch m.actors a " +
            " left join fetch m.directors d " +
            " left join fetch sh.cinemaHall ch")
    List<Movie> findAll();

    @Query("select distinct m from Movie m " +
            "left join fetch m.genres " +
            " left join fetch m.actors a " +
            " left join fetch m.directors d " +
            " left join fetch m.showtimeList sh where m.id=?1")
    Optional<Movie> findById(Long id);

}
