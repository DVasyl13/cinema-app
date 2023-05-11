package com.lab.app.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "cinema_hall")
@Getter @Setter
@ToString(exclude = {"showtimeList", "cinema"})
@NoArgsConstructor
public class CinemaHall {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "capacity", nullable = false)
    private Integer capacity;

    @OneToMany(mappedBy = "cinemaHall", orphanRemoval = true, fetch = FetchType.LAZY)
    @JsonManagedReference
    private Set<Showtime> showtimeList = new HashSet<>();

    @ManyToOne(cascade = CascadeType.ALL)
    @JsonBackReference
    @JoinColumn(name = "cinema_id", referencedColumnName = "id",
            insertable = false, updatable = false,
            foreignKey = @ForeignKey(name = "FK_cinemaHall_cinema"))
    private Cinema cinema;

    public void addShowtime(Showtime showtime) {
        showtime.setCinemaHall(this);
        showtimeList.add(showtime);
    }

}
