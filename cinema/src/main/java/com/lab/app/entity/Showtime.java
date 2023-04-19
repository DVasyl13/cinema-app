package com.lab.app.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.lab.app.util.enums.Format;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "showtime")
@Getter
@Setter
@ToString
@NoArgsConstructor
public class Showtime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "format", nullable = false)
    private Format format;

    @Column(name = "start_time", nullable = false)
    private Date startTime;

    @Column(name = "end_time", nullable = false)
    private Date endTime;

    @OneToMany(mappedBy = "showtime", orphanRemoval = true)
    private List<Booking> bookings = new ArrayList<>();

    @ManyToOne(cascade = CascadeType.ALL)
    @JsonBackReference
    @JoinColumn(name = "movie_id", referencedColumnName = "id",
            insertable = false, updatable = false,
            foreignKey = @ForeignKey(name = "FK_showtime_movie"))
    private Movie movie;

    @ManyToOne(cascade = CascadeType.ALL)
    @JsonBackReference
    @JoinColumn(name = "cinema_hall_id", referencedColumnName = "id",
            insertable = false, updatable = false,
            foreignKey = @ForeignKey(name = "FK_showtime_cinemaHall"))
    private CinemaHall cinemaHall;

    public void addBooking(Booking booking) {
        booking.setShowtime(this);
        bookings.add(booking);
    }

}
