package com.example.it_helpdesk_backend.service;

import com.example.it_helpdesk_backend.entity.User;
import com.example.it_helpdesk_backend.enums.Role;
import com.example.it_helpdesk_backend.repository.UserRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public List<User> getUsersByRole(Role role) {
        return userRepository.findByRole(role);
    }

    public List<User> getUsersByDepartment(String department) {
        return userRepository.findByDepartment(department);
    }

    public List<User> getAvailableAgents() {
        return userRepository.findByRoleAndIsAvailable(
                Role.IT_SUPPORT_AGENT, true);
    }
}