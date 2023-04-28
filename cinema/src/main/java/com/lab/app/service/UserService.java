package com.lab.app.service;

import com.lab.app.controller.exception.UserAlreadyExistException;
import com.lab.app.controller.exception.UserNotFoundException;
import com.lab.app.controller.exception.WrongPasswordException;
import com.lab.app.dto.NewUserSubmission;
import com.lab.app.entity.User;
import com.lab.app.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    private final BCryptPasswordEncoder passwordEncoder;


    @Transactional
    public User saveUser(NewUserSubmission newUser) {
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

}
