package com.lab.app.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Entity
@Table(name = "cinema")
@Getter @Setter
@ToString
@NoArgsConstructor
public class Cinema {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "address", nullable = false , unique = true)
    private String address;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @OneToMany(mappedBy = "cinema", orphanRemoval = true)
    private List<CinemaHall> cinemaHallList;

}
