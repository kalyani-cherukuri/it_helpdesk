package com.example.it_helpdesk_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginResponse {

    private String token;
    private Long id;
    private String email;
    private String role;
    private String name;
}