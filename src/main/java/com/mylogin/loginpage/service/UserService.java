package com.mylogin.loginpage.service;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.mylogin.loginpage.dto.LoginRequestDTO;
import com.mylogin.loginpage.dto.LoginResponseDTO;
import com.mylogin.loginpage.dto.RegisterRequestDTO;
import com.mylogin.loginpage.dto.RegisterResponseDTO;
import com.mylogin.loginpage.exception.EmailAlreadyExistException;
import com.mylogin.loginpage.exception.PasswordMissmatchException;
import com.mylogin.loginpage.exception.UsernameAlreadyExistsException;
import com.mylogin.loginpage.model.Role;
import com.mylogin.loginpage.model.User;
import com.mylogin.loginpage.repository.UserRepository;

import jakarta.validation.Valid;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
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
        user.setRole(Role.USER); // Set default role
        userRepository.save(user);

        return new RegisterResponseDTO(user.getEmail(), user.getUsername());
    }

    
    public LoginResponseDTO loginUser(@Valid @RequestBody LoginRequestDTO request) {
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(request.email(), request.password())
        );
            SecurityContextHolder.getContext().setAuthentication(authentication);
    return new LoginResponseDTO ("Login successful Welcome " );
    }
    
}
