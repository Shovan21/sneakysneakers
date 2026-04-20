package com.ecommerce.backend.controller;

import com.ecommerce.backend.config.JwtUtil;
import com.ecommerce.backend.entity.User;
import com.ecommerce.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil; // Injected to generate tokens

    @PostMapping("/register")
    public String registerUser(@RequestBody User user) {
        if(userRepository.findByUsername(user.getUsername()).isPresent()) {
            return "Username is already taken!";
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole("ROLE_USER");
        
        userRepository.save(user);
        return "User registered successfully!";
    }

    @PostMapping("/login")
    public String loginUser(@RequestBody User user) {
        // 1. Find the user by username
        Optional<User> existingUserOpt = userRepository.findByUsername(user.getUsername());

        if (existingUserOpt.isPresent()) {
            User existingUser = existingUserOpt.get();
            
            // 2. Check if the provided raw password matches the encoded password in DB
            if (passwordEncoder.matches(user.getPassword(), existingUser.getPassword())) {
                // 3. If match, generate and return the JWT token
                return jwtUtil.generateToken(existingUser.getUsername());
            }
        }
        
        // 4. If user not found or password doesn't match
        return "Invalid username or password!";
    }
}