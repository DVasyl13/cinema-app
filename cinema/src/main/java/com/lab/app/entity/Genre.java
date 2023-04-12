package com.lab.app.entity;

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
    @JoinTable(name = "movie_genre", joinColumns = { @JoinColumn(name = "genre_id") }
            , inverseJoinColumns =  { @JoinColumn(name = "movie_id") }
            , foreignKey = @ForeignKey(name = "FK_genre_movie"))
    Set<Movie> movies = new HashSet<>();

}
