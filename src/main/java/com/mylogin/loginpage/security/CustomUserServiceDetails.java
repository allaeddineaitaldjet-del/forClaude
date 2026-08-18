package com.mylogin.loginpage.security;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.mylogin.loginpage.model.User;
import com.mylogin.loginpage.repository.UserRepository;
@Service
public class CustomUserServiceDetails implements UserDetailsService {
    private final UserRepository userRepository;

    public CustomUserServiceDetails(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(username).orElseThrow(() -> new UsernameNotFoundException("email not found"));
        return new CustomUserDetails(user);
    }
}
    