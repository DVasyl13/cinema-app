package com.lab.app.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.lab.app.util.SeatID;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "seat")
@Getter @Setter
@ToString(exclude = "booking")
@NoArgsConstructor
public class Seat {
    @EmbeddedId
    private SeatID id;

    @Column(name = "price", nullable = false)
    private Double price;

    @ManyToOne
    @JoinColumn(name = "booking_id", referencedColumnName = "id",
                insertable = false, updatable = false,
                foreignKey = @ForeignKey(name = "FK_seat_booking"))
    @JsonBackReference
    private Booking booking;


    public Seat(SeatID id, Double price) {
        this.id = id;
        this.price = price;
    }

}
