package com.example.it_helpdesk_backend.repository;

import com.example.it_helpdesk_backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.it_helpdesk_backend.enums.Role;
import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);
    List<User> findByRole(Role role);

    List<User> findByDepartment(String department);

    List<User> findByRoleAndIsAvailable(Role role, Boolean isAvailable);
    long count();
}