package com.lab.app.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "booking")
@Getter @Setter
@ToString
@NoArgsConstructor
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "number_of_tickets")
    private Integer numberOfTickets;

    @Column(name = "seats_numbers")
    private String seatsNumbers; //[S1,S2,S5,A6] or [12,13,14,15,22]

    //TODO: connection to User Table
    //      connection to Showtime Table
}
