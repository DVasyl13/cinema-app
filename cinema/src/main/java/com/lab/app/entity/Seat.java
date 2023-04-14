package com.lab.app.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.lab.app.util.SeatID;
import com.lab.app.util.enums.SeatType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "seat")
@Getter @Setter
@ToString(exclude = "booking")
@NoArgsConstructor
public class Seat {
    @EmbeddedId
    private SeatID id;

    @Column(name = "type", nullable = false)
    private SeatType type;

    @Column(name = "price", nullable = false)
    private Double price;

    @ManyToOne
    @JoinColumn(name = "booking_id", referencedColumnName = "id",
                insertable = false, updatable = false,
                foreignKey = @ForeignKey(name = "FK_seat_booking"))
    @JsonBackReference
    private Booking booking;

}
