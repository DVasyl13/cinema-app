package com.lab.app.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.*;

@Entity
@Table(name = "showtime")
@Getter
@Setter
@ToString(exclude = {"bookings"})
@NoArgsConstructor
public class Showtime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "start_time", nullable = false)
    private Date startTime;

    @Column(name = "end_time", nullable = false)
    private Date endTime;

    @OneToMany(mappedBy = "showtime", orphanRemoval = true,  fetch = FetchType.LAZY)
    @JsonManagedReference
    private Set<Booking> bookings = new HashSet<>();

    @ManyToOne(cascade = CascadeType.ALL,  fetch = FetchType.EAGER)
    @JsonBackReference
    @JoinColumn(name = "movie_id", referencedColumnName = "id",
            insertable = false, updatable = false,
            foreignKey = @ForeignKey(name = "FK_showtime_movie"))
    private Movie movie;

    @ManyToOne(cascade = CascadeType.ALL,  fetch = FetchType.EAGER)
    @JsonBackReference
    @JoinColumn(name = "cinema_hall_id", referencedColumnName = "id",
            insertable = false, updatable = false,
            foreignKey = @ForeignKey(name = "FK_showtime_cinemaHall"))
    private CinemaHall cinemaHall;

}
