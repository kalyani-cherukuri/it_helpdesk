package com.example.it_helpdesk_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.it_helpdesk_backend.entity.ITTicket;
import com.example.it_helpdesk_backend.entity.TicketComment;

public interface TicketCommentRepository
        extends JpaRepository<TicketComment,Long> {

    List<TicketComment> findByTicket(ITTicket ticket);
}