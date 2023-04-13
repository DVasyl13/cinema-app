package com.lab.app.service;

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
    public boolean saveUser(NewUserSubmission newUser) {
        User user = new User( newUser.name(),
                            newUser.surname(),
                            newUser.password(),
                            newUser.email());

        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);

        if (isEmailAlreadyInUse(user.getEmail())) {
            return false;
        }
        else {
            userRepository.save(user);
        }
        return true;
    }

    @Transactional
    public boolean authenticateUser(String email, String password) {
        User user = userRepository.findUserByEmail(email);
        return user != null && passwordEncoder.matches(password, user.getPassword());
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
