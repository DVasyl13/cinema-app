package com.lab.app.service;

import com.lab.app.dto.NewBookingSubmission;
import com.lab.app.dto.SeatSubmission;
import com.lab.app.entity.Booking;
import com.lab.app.entity.Seat;
import com.lab.app.entity.Showtime;
import com.lab.app.repository.SeatRepository;
import com.lab.app.util.SeatID;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookingService {
    @PersistenceContext
    private EntityManager entityManager;

    private final EmailSenderService mailService;
    private final SeatRepository seatRepository;
    private final ShowtimeService showtimeService;

    @Transactional(readOnly = true)
    public Set<Booking> getBookingsByShowtimeId(Long showtimeId) {
        return showtimeService.getShowtimeById(showtimeId).getBookings();
    }

    @Transactional
    public Optional<Booking> saveBooking(NewBookingSubmission bookingSubmission) {
        var seatSubmissionSet = bookingSubmission.seats();
        var totalPrice = seatSubmissionSet.stream().mapToDouble(SeatSubmission::price).sum();

//      Get sequence first
        Long nextVal = (Long) entityManager
                .createNativeQuery("SELECT nextval('cinema.booking_id_seq')")
                .getSingleResult();

        String sql ="INSERT INTO cinema.booking(id, total_price, showtime_id, user_id) " +
                "VALUES (:id, :totalPrice, :showtime_id, :user_id)";

        Query query = entityManager.createNativeQuery(sql);
        query.setParameter("id", nextVal);
        query.setParameter("totalPrice", totalPrice);
        query.setParameter("showtime_id", bookingSubmission.showtimeId());
        query.setParameter("user_id", bookingSubmission.userId());

        var res = query.executeUpdate();

        if (res == 0) {
            throw new NoSuchElementException();
        }

        Set<Seat> seats = seatSubmissionSet.stream().map(e -> {
            return new Seat(new SeatID(nextVal, Math.toIntExact(e.seatId())), e.price() );
        }).collect(Collectors.toSet());
        seatRepository.saveAll(seats);

        sendEmail(bookingSubmission.userEmail(), bookingSubmission.showtimeId(), totalPrice, seats);

        return Optional.of(new Booking(nextVal, totalPrice, seats));
    }

    private void sendEmail(String toEmail, Long showtimeId, Double totalPrice, Set<Seat> seats) {
        Showtime showtime = showtimeService.getShowtimeById(showtimeId);
        String mailBody = getEmailBody(showtime, totalPrice, seats);
        mailService.sendSimpleEmail(toEmail, mailBody, "Бронювання квитків");
    }

    private String getEmailBody(Showtime showtime, Double totalPrice, Set<Seat> seats) {
        StringBuilder mailBody = new StringBuilder();
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy.MM.dd HH:mm");

        mailBody.append("Фільм: ")
                .append(showtime.getMovie().getTitle())
                .append("\n");
        mailBody.append("Час: ")
                .append(formatter.format(showtime.getStartTime()))
                .append(" - ")
                .append(formatter.format(showtime.getEndTime()))
                .append("\n");
        mailBody.append("Кінотеатр: ")
                .append(showtime.getCinemaHall().getCinema().getAddress())
                .append("\n");
        mailBody.append("Зал: ")
                .append(showtime.getCinemaHall().getId())
                .append("\n");
        mailBody.append("Загальна вартість: ")
                .append(totalPrice)
                .append("₴")
                .append("\n");
        String mailBodySeats = getSeatSubmission(seats);
        mailBody.append(mailBodySeats);
        return mailBody.toString();
    }

    private String getSeatSubmission(Set<Seat> seats) {
        return seats.stream().map(e -> {
            double seatNum = e.getId().getSeatNumber();
            int row = (int) Math.ceil(seatNum/12);
            int col = (seatNum % 12) == 0 ? 12 : (int) (seatNum % 12);
            return "Ряд: " + row + ", місце: " + col + "\n";
        }).collect(Collectors.joining());
    }
}
