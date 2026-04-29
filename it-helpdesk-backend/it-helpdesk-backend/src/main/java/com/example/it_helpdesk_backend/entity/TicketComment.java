package com.example.it_helpdesk_backend.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name="ticket_comments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TicketComment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name="ticket_id")
    private ITTicket ticket;

    @ManyToOne
    @JoinColumn(name="commented_by")
    private User commentedBy;

    @Column(length=1000)
    private String comment;

    private Boolean isInternal;

    private LocalDateTime createdAt;
}