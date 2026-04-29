package com.example.it_helpdesk_backend.dto;

import lombok.Data;
import com.example.it_helpdesk_backend.enums.Role;
@Data
public class RegisterRequest {
   private String name;
   private String email;
   private String password;
   private String department;
   private Role role;
}
    