package com.lab.app.entity;

import com.lab.app.enums.Format;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "screen")
@Getter @Setter
@ToString
@NoArgsConstructor
public class Screen {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "capacity", nullable = false)
    private Integer capacity;

    @Column(name = "format", nullable = false)
    private Format format;

    //TODO: connection to Showtime Table
    //      connection to Cinema Table

}
