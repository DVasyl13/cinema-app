package com.lab.app.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "genre")
@Setter @Getter
@NoArgsConstructor
public class Genre {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false, unique = true)
    private String name;

    @ManyToMany(cascade = { CascadeType.ALL })
    @JsonBackReference
    @JoinTable(name = "movie_genre", joinColumns = { @JoinColumn(name = "genre_id") }
            , inverseJoinColumns =  { @JoinColumn(name = "movie_id") }
            , foreignKey = @ForeignKey(name = "FK_genre_movie"))
    Set<Movie> movies = new HashSet<>();

}
