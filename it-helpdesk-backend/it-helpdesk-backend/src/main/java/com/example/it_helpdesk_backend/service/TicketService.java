package com.example.it_helpdesk_backend.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.it_helpdesk_backend.entity.ITTicket;
import com.example.it_helpdesk_backend.entity.TicketComment;
import com.example.it_helpdesk_backend.entity.User;
import com.example.it_helpdesk_backend.enums.TicketStatus;
import com.example.it_helpdesk_backend.repository.TicketCommentRepository;
import com.example.it_helpdesk_backend.repository.TicketRepository;
import com.example.it_helpdesk_backend.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TicketService {

    private final TicketRepository ticketRepository;
    private final UserRepository userRepository;
    private final TicketCommentRepository commentRepository;

    public ITTicket createTicket(ITTicket ticket, Long employeeId) {

        User user = userRepository.findById(employeeId).orElseThrow();

        ticket.setRaisedBy(user);
        ticket.setStatus(TicketStatus.OPEN);
        ticket.setCreatedAt(LocalDateTime.now());
        ticket.setUpdatedAt(LocalDateTime.now());
        ticket.setTicketNumber("TKT-" + System.currentTimeMillis());

        return ticketRepository.save(ticket);
    }
    public ITTicket closeTicket(Long ticketId){

    ITTicket ticket = ticketRepository.findById(ticketId).orElseThrow();

    if(ticket.getStatus() != TicketStatus.RESOLVED){
        throw new RuntimeException("Only RESOLVED ticket can be closed");
    }

    ticket.setStatus(TicketStatus.CLOSED);
    ticket.setUpdatedAt(LocalDateTime.now());

    return ticketRepository.save(ticket);
}
public ITTicket reopenTicket(Long ticketId){

    ITTicket ticket = ticketRepository.findById(ticketId).orElseThrow();

    if(ticket.getStatus() != TicketStatus.RESOLVED &&
       ticket.getStatus() != TicketStatus.CLOSED){
        throw new RuntimeException("Only RESOLVED/CLOSED can reopen");
    }

    ticket.setStatus(TicketStatus.REOPENED);
    ticket.setUpdatedAt(LocalDateTime.now());

    return ticketRepository.save(ticket);
}
public ITTicket escalateTicket(Long ticketId){

    ITTicket ticket = ticketRepository.findById(ticketId).orElseThrow();

    ticket.setStatus(TicketStatus.ESCALATED);
    ticket.setUpdatedAt(LocalDateTime.now());

    return ticketRepository.save(ticket);
}
public TicketComment addComment(
        Long ticketId,
        Long userId,
        String comment,
        Boolean isInternal){

    ITTicket ticket = ticketRepository.findById(ticketId).orElseThrow();

    User user = userRepository.findById(userId).orElseThrow();

    TicketComment tc = TicketComment.builder()
            .ticket(ticket)
            .commentedBy(user)
            .comment(comment)
            .isInternal(isInternal)
            .createdAt(LocalDateTime.now())
            .build();

    return commentRepository.save(tc);
}
public List<TicketComment> getComments(Long ticketId){

    ITTicket ticket = ticketRepository.findById(ticketId).orElseThrow();

    return commentRepository.findByTicket(ticket);
}

    public List<ITTicket> getAllTickets() {
        return ticketRepository.findAll();
    }

    public List<ITTicket> getEmployeeTickets(Long employeeId) {
        User user = userRepository.findById(employeeId).orElseThrow();
        return ticketRepository.findByRaisedBy(user);
    }

    public ITTicket assignTicket(Long ticketId, Long agentId) {

        ITTicket ticket = ticketRepository.findById(ticketId).orElseThrow();
        User agent = userRepository.findById(agentId).orElseThrow();

        ticket.setAssignedTo(agent);
        ticket.setStatus(TicketStatus.ASSIGNED);
        ticket.setUpdatedAt(LocalDateTime.now());

        return ticketRepository.save(ticket);
    }

    public ITTicket updateStatus(Long ticketId, TicketStatus status) {

        ITTicket ticket = ticketRepository.findById(ticketId).orElseThrow();

        ticket.setStatus(status);
        ticket.setUpdatedAt(LocalDateTime.now());

        return ticketRepository.save(ticket);
    }

    public ITTicket resolveTicket(Long ticketId, String resolution) {

        ITTicket ticket = ticketRepository.findById(ticketId).orElseThrow();

        ticket.setStatus(TicketStatus.RESOLVED);
        ticket.setResolution(resolution);
        ticket.setResolvedAt(LocalDateTime.now());
        ticket.setUpdatedAt(LocalDateTime.now());

        return ticketRepository.save(ticket);
    }
}