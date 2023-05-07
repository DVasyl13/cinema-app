package com.lab.app.util;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.*;

import java.io.Serializable;

@Embeddable
@NoArgsConstructor
@Getter @Setter
@EqualsAndHashCode
public class SeatID implements Serializable {
    @Column(name = "booking_id")
    private Long bookingId;

    @Column(name = "seat_number")
    private Integer seatNumber;

    public SeatID(Long bookingId, Integer seatNumber) {
        this.bookingId = bookingId;
        this.seatNumber = seatNumber;
    }
}
