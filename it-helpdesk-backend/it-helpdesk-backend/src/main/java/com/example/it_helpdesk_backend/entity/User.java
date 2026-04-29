package com.example.it_helpdesk_backend.entity;

import com.example.it_helpdesk_backend.enums.Role;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name="users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonIgnoreProperties({
    "hibernateLazyInitializer",
    "handler",
    "password"
})
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(unique=true)
    private String email;
    @JsonIgnore
    private String password;

    private String department;

    @Enumerated(EnumType.STRING)
    private Role role;

    private Boolean isAvailable = true;

    private LocalDateTime createdAt = LocalDateTime.now();
}