package com.lab.app.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.*;

@Entity
@Table(name = "movie")
@Getter @Setter
@ToString(exclude = "showtimeList")
@NoArgsConstructor
public class Movie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "poster_url")
    private String posterURL;

    @Column(name = "wide_poster_url")
    private String widePosterURL;

    @Column(name = "trailer_URL")
    private String trailerURL;

    @Column(name = "duration")
    private Integer duration;

    @Column(name = "rating")
    private Float rating;

    @Column(name = "age_limit")
    private Integer ageLimit;

    @Column(name = "release_Date")
    private Date releaseDate;

    @Column(name = "start_show_date")
    private Date startShowDate;

    @Column(name = "end_show_date")
    private Date endShowDate;



    @ManyToMany(mappedBy = "movies")
    @JsonManagedReference
    private Set<Genre> genres = new HashSet<>();
    @OneToMany(mappedBy = "movie", orphanRemoval = true)
    @JsonManagedReference
    private List<Showtime> showtimeList = new ArrayList<>();

    public void addShowtime(Showtime showtime) {
        showtime.setMovie(this);
        showtimeList.add(showtime);
    }
}
