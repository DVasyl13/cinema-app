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

}
