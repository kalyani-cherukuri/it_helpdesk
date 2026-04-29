package com.example.it_helpdesk_backend.controller;

import com.example.it_helpdesk_backend.entity.User;
import com.example.it_helpdesk_backend.enums.Role;
import com.example.it_helpdesk_backend.service.UserService;

import lombok.RequiredArgsConstructor;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    // Create user
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public User createUser(@RequestBody User user) {
        return userService.createUser(user);
    }

    // Get all users
    @PreAuthorize("hasAnyRole('ADMIN','IT_MANAGER')")
    @GetMapping
    public List<User> getUsers(
            @RequestParam(required = false) Role role,
            @RequestParam(required = false) String department) {

        if (role != null) {
            return userService.getUsersByRole(role);
        }

        if (department != null) {
            return userService.getUsersByDepartment(department);
        }

        return userService.getAllUsers();
    }

    // Available support agents
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/agents/available")
    public List<User> getAvailableAgents() {
        return userService.getAvailableAgents();
    }
}