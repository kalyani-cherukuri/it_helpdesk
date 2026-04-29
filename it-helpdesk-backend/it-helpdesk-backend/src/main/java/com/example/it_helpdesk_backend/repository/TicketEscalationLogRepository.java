package com.example.it_helpdesk_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.it_helpdesk_backend.entity.TicketEscalationLog;

public interface TicketEscalationLogRepository
        extends JpaRepository<TicketEscalationLog,Long> {
}