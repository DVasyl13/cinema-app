package com.lab.app.entity.util;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.*;

import java.io.Serializable;

@Embeddable
@RequiredArgsConstructor
@NoArgsConstructor
@Getter @Setter
@EqualsAndHashCode
public class SeatID implements Serializable {
    @Column(name = "booking_id")
    private Long bookingId;

    @Column(name = "seat_number")
    private Integer seatNumber;
}
