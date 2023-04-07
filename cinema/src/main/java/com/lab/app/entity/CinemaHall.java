package com.lab.app.entity;

import com.lab.app.entity.util.enums.Format;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "cinema_hall")
@Getter @Setter
@ToString
@NoArgsConstructor
public class CinemaHall {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "capacity", nullable = false)
    private Integer capacity;

    @OneToMany(mappedBy = "cinemaHall", orphanRemoval = true)
    private List<Showtime> showtimeList = new ArrayList<>();;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "cinema_id", referencedColumnName = "id",
            insertable = false, updatable = false,
            foreignKey = @ForeignKey(name = "FK_cinemaHall_cinema"))
    private Cinema cinema;

    public void addShowtime(Showtime showtime) {
        showtime.setCinemaHall(this);
        showtimeList.add(showtime);
    }

}
