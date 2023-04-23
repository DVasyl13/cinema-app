package com.lab.app.repository;

import com.lab.app.entity.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


public interface MovieRepository extends JpaRepository<Movie, Long> {
    @Override
    @Query("select m " +
            "from Movie m" +
            " left join fetch m.genres g" +
            " left join fetch m.showtimeList sh" +
            " left join fetch sh.cinemaHall ch")
    List<Movie> findAll();
}
