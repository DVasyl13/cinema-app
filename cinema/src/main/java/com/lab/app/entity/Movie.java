package com.lab.app.entity;

import com.lab.app.enums.Genre;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "movie")
@Getter
@Setter
@ToString
@NoArgsConstructor
public class Movie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "poster_URL")
    private String posterURL;

    @Column(name = "trailer_URL")
    private String trailerURL;

    @Column(name = "duration")
    private Integer duration;

    @Column(name = "rating")
    private Byte rating;

    @Column(name = "release_Date")
    private Date releaseDate;

    @Column(name = "genre")
    private Genre genre;

    @OneToMany(mappedBy = "movie", orphanRemoval = true)
    private List<Showtime> showtimeList = new ArrayList<>();;

    public void addShowtime(Showtime showtime) {
        showtime.setMovie(this);
        showtimeList.add(showtime);
    }
}
