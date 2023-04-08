package com.lab.app.service;

import com.lab.app.entity.User;
import com.lab.app.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {

    private UserRepository userRepository;

    private BCryptPasswordEncoder passwordEncoder;


    @Transactional
    public void saveUser(User user) {
        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);
        userRepository.save(user);
    }

    @Transactional
    public boolean authenticateUser(String username, String password) {
        User user = userRepository.findUserByUserName(username);
        return user != null && passwordEncoder.matches(password, user.getPassword());
    }

}
