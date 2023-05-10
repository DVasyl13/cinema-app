package com.lab.app.repository;

import com.lab.app.dto.UserFullSubmission;
import com.lab.app.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserRepository extends JpaRepository<User, Long> {
    @Query("select distinct u from User u left join fetch u.bookings b left join fetch b.seats where u.email =?1")
    User findUserByEmailFetchBooking(String email);

    User findUserByEmail(String email);
    @Query("select distinct u " +
            " from User u " +
            " left join fetch u.bookings b " +
            " left join fetch b.seats " +
            " where u.id=?1")
    User findUserByIdFetchBookingAndSeats(Long id);
}
