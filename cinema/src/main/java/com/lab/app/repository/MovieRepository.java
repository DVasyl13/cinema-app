package com.lab.app.repository;

import com.lab.app.entity.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


public interface MovieRepository extends JpaRepository<Movie, Long> {
    @Override
    @Query("select m " +
            "from Movie m" +
            " left join fetch Genre g" +
            " on m.id=g.id")
    List<Movie> findAll();
}
