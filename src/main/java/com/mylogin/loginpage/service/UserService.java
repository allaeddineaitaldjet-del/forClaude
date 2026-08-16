package com.mylogin.loginpage.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.mylogin.loginpage.dto.RegisterRequestDTO;
import com.mylogin.loginpage.dto.RegisterResponseDTO;
import com.mylogin.loginpage.exception.EmailAlreadyExistException;
import com.mylogin.loginpage.exception.PasswordMissmatchException;
import com.mylogin.loginpage.exception.UsernameAlreadyExistsException;
import com.mylogin.loginpage.model.User;
import com.mylogin.loginpage.repository.UserRepository;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }
    public RegisterResponseDTO register(RegisterRequestDTO request) {
       
        if (userRepository.existsByUsername(request.username())) {
            throw new UsernameAlreadyExistsException("Username already exists");
        }

       
        if (userRepository.existsByEmail(request.email())) {
            throw new EmailAlreadyExistException("Email already exists");
        }

        
        if (!request.password().equals(request.confirmPassword())) {
            throw new PasswordMissmatchException("Passwords do not match");
        }

        
        User user = new User();
        user.setUsername(request.username());
        user.setEmail(request.email());
        user.setPassword(passwordEncoder.encode(request.password()));
        userRepository.save(user);

        return new RegisterResponseDTO(user.getEmail(), user.getUsername());
    }
}
