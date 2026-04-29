package com.example.it_helpdesk_backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.it_helpdesk_backend.entity.SLAConfig;
import com.example.it_helpdesk_backend.enums.Priority;

public interface SLAConfigRepository
        extends JpaRepository<SLAConfig,Long> {

    Optional<SLAConfig> findByPriorityAndIsActive(
            Priority priority,
            Boolean isActive
    );
}