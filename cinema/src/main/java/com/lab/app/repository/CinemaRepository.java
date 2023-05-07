package com.lab.app.repository;

import com.lab.app.dto.CinemaDto;
import com.lab.app.entity.Cinema;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CinemaRepository extends JpaRepository<Cinema, Long> {
    @Query(" SELECT new com.lab.app.dto.CinemaDto(c.id, c.address, c.email, c.phoneNumber)" +
            " from Cinema c")
    List<CinemaDto> getAllCinemas();

}
