package com.lab.app.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "booking")
@Getter @Setter
@ToString(exclude = {"user"})
@NoArgsConstructor
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "total_price", nullable = false)
    private Double totalPrice;

    @OneToMany(mappedBy = "booking", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private Set<Seat> seats = new HashSet<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false,
                foreignKey = @ForeignKey(name = "FK_booking_user"))
    @JsonBackReference
    private User user;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "showtime_id", referencedColumnName = "id",
                        insertable = false, updatable = false,
            foreignKey = @ForeignKey(name = "FK_booking_showtime"))
    @JsonBackReference
    private Showtime showtime;

    public Booking(Long id, Double totalPrice, Set<Seat> seats) {
        this.id = id;
        this.totalPrice = totalPrice;
        this.seats = seats;
    }
}
