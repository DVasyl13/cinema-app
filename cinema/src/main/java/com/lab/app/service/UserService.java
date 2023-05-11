package com.lab.app.service;

import com.lab.app.controller.exception.UserAlreadyExistException;
import com.lab.app.controller.exception.UserNotFoundException;
import com.lab.app.controller.exception.WrongPasswordException;
import com.lab.app.dto.BookingDto;
import com.lab.app.dto.UserFullDto;
import com.lab.app.dto.UserFullSubmission;
import com.lab.app.dto.UserDto;
import com.lab.app.entity.User;
import com.lab.app.repository.ShowtimeRepository;
import com.lab.app.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;


    @Transactional
    public User saveUser(UserFullSubmission newUser) {
        User user = new User(newUser.name(), newUser.surname(), newUser.password(), newUser.email());

        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);

        if (isEmailAlreadyInUse(user.getEmail())) {
            throw new UserAlreadyExistException(newUser.email());
        }
        else {
            return userRepository.save(user);
        }
    }

    @Transactional
    public User authenticateUser(String email, String password) {
        User user = userRepository.findUserByEmailFetchBooking(email);
        if( user != null) {
            if (passwordEncoder.matches(password, user.getPassword())) {
                return user;
            }
            throw new WrongPasswordException(email);
        }
        throw new UserNotFoundException(email);
    }

    /**
     * @return true if email is already in use, otherwise false
     */
    @Transactional
    protected boolean isEmailAlreadyInUse(String email) {
        return Optional.ofNullable(userRepository.findUserByEmail(email))
                .isPresent();
    }

    @Transactional(readOnly = true)
    public UserFullDto getUser(UserDto userDto) {
        User user = userRepository.findUserByIdFetchBookingAndSeats(userDto.id());
        if (!passwordEncoder.matches(userDto.password(), user.getPassword())) {
            throw new WrongPasswordException(""+user.getId());
        }
        var b = user.getBookings();
        Set<BookingDto> bookings = b.stream().map((e) -> {
           return new BookingDto(e.getId(), e.getTotalPrice(), e.getSeats(),
                   e.getShowtime().getMovie().getTitle(), e.getShowtime().getStartTime(),
                   e.getShowtime().getCinemaHall().getId(),
                   e.getShowtime().getCinemaHall().getCinema().getAddress());
        }).collect(Collectors.toSet());
        return new UserFullDto(user.getName(), user.getSurname(), user.getEmail(), bookings);
    }

    @Transactional
    public int putUserChanges(UserFullSubmission userFullSubmission) {
        Optional<User> user = userRepository.findById(userFullSubmission.id());
        int countOfChangedFields = 0;
        if (!passwordEncoder.matches(userFullSubmission.oldpassword(), user.get().getPassword())) {
            throw new WrongPasswordException(""+user.get().getId());
        }
        if (Optional.ofNullable(userFullSubmission.name()).isPresent()) {
            user.get().setName(userFullSubmission.name());
            countOfChangedFields++;
        }
        if (Optional.ofNullable(userFullSubmission.surname()).isPresent()) {
            user.get().setSurname(userFullSubmission.surname());
            countOfChangedFields++;
        }
        if (Optional.ofNullable(userFullSubmission.email()).isPresent()) {
            user.get().setEmail(userFullSubmission.email());
            countOfChangedFields++;
        }
        if (Optional.ofNullable(userFullSubmission.password()).isPresent()) {
            user.get().setPassword(passwordEncoder.encode(userFullSubmission.password()));
            countOfChangedFields++;
        }
        return countOfChangedFields;
    }
}
