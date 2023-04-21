package com.lab.app.repository;

import com.lab.app.entity.Cinema;
import com.lab.app.entity.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CinemaRepository extends JpaRepository<Cinema, Long> {
    @Override
    @Query("select c " +
            "from Cinema c" +
            " left join fetch c.cinemaHallList ")
    List<Cinema> findAll();
}
