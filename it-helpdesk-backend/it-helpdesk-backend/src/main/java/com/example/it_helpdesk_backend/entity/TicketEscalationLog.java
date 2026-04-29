package com.example.it_helpdesk_backend.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name="ticket_escalation_logs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TicketEscalationLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name="ticket_id")
    private ITTicket ticket;

    private String reason;

    private Integer escalationLevel;

    private LocalDateTime escalatedAt;
}