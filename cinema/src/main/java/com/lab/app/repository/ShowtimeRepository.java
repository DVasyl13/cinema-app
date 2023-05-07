package com.lab.app.repository;


import com.lab.app.entity.Showtime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ShowtimeRepository extends JpaRepository<Showtime, Long> {

    @Query("select distinct s from  Showtime s " +
            "left join fetch s.cinemaHall ch " +
            "left join fetch s.movie m" +
            " left join fetch m.genres" +
            " left join fetch m.directors " +
            " left join fetch m.actors" +
            " left join fetch s.bookings b " +
            " left join fetch b.seats" +
            " left join fetch ch.cinema where s.id =?1")
    Showtime findShowtimeById(Long id);

    @Query("select distinct s from  Showtime s " +
            "left join fetch s.cinemaHall ch " +
            "left join fetch s.movie m" +
            " left join fetch m.genres" +
            " left join fetch m.directors " +
            " left join fetch m.actors" +
            " left join fetch s.bookings b " +
            " left join fetch b.seats" +
            " left join fetch ch.cinema where s.movie.id =?1")
    List<Showtime> findShowtimesByMovieId(Long id);
}
