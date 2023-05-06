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
@Table(name = "booking")
@Getter @Setter
@ToString(exclude = { "showtime"})
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

  /*  @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false,
                foreignKey = @ForeignKey(name = "FK_booking_user"))
    @JsonBackReference
    private User user;*/

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "showtime_id", referencedColumnName = "id",
                        insertable = false, updatable = false,
            foreignKey = @ForeignKey(name = "FK_booking_showtime"))
    @JsonBackReference
    private Showtime showtime;

 /*   public Booking(Double totalPrice, User user) {
        this.totalPrice = totalPrice;
        this.user = user;
        // ?? seats ?? showtime
    }*/
    public void addSeat(Seat seat) {
        seat.setBooking(this);
        seats.add(seat);
    }
    public void removeSeat(Seat seat) {
        seat.setBooking(null);
        seats.remove(seat);
    }
}
