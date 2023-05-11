package com.lab.app.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "actor")
@Setter @Getter
@ToString(exclude = {"movies"})
@RequiredArgsConstructor
public class Actor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "surname", nullable = false)
    private String surname;

    @ManyToMany(cascade = { CascadeType.ALL })
    @JsonBackReference
    @JoinTable(name = "actor_movie", joinColumns = { @JoinColumn(name = "actor_id") }
            , inverseJoinColumns =  { @JoinColumn(name = "movie_id") }
            , foreignKey = @ForeignKey(name = "FK_actor_movie"))
    Set<Movie> movies = new HashSet<>();
}
