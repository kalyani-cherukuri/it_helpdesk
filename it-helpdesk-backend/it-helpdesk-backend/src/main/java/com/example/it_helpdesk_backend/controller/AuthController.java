package com.example.it_helpdesk_backend.controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.it_helpdesk_backend.dto.LoginRequest;
import com.example.it_helpdesk_backend.dto.LoginResponse;
import com.example.it_helpdesk_backend.dto.RegisterRequest;
import com.example.it_helpdesk_backend.service.AuthService;

import org.springframework.web.bind.annotation.RequestBody;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

   private final AuthService authService;

   @PostMapping("/register")
   public String register(@RequestBody RegisterRequest request){
      return authService.register(request);
   }

   @PostMapping("/login")
   public LoginResponse login(@RequestBody LoginRequest request){
      return authService.login(request);
   }
}