package com.example.it_helpdesk_backend.service;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.it_helpdesk_backend.dto.LoginRequest;
import com.example.it_helpdesk_backend.dto.LoginResponse;
import com.example.it_helpdesk_backend.dto.RegisterRequest;
import com.example.it_helpdesk_backend.entity.User;
import com.example.it_helpdesk_backend.repository.UserRepository;
import com.example.it_helpdesk_backend.security.JwtService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

   private final UserRepository userRepository;
   private final JwtService jwtService;
   private final PasswordEncoder passwordEncoder;

   public String register(RegisterRequest request){

      if(userRepository.existsByEmail(request.getEmail()))
         throw new RuntimeException("Email already exists");

      User user = User.builder()
              .name(request.getName())
              .email(request.getEmail())
              .password(passwordEncoder.encode(request.getPassword()))
              .department(request.getDepartment())
              .role(request.getRole())
              .build();

      userRepository.save(user);

      return "User Registered Successfully";
   }
public LoginResponse login(LoginRequest request) {

    User user = userRepository
            .findByEmail(request.getEmail())
            .orElseThrow(() ->
                new RuntimeException("User not found"));

    if (!passwordEncoder.matches(
            request.getPassword(),
            user.getPassword())) {

        throw new RuntimeException("Invalid password");
    }

    String token =
            jwtService.generateToken(user.getEmail());

    return new LoginResponse(
            token,
            user.getId(),
            user.getEmail(),
            user.getRole().name(),
            user.getName()
    );
}
}