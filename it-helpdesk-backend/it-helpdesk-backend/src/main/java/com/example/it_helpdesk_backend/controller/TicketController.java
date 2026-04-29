package com.example.it_helpdesk_backend.controller;

import java.util.List;
import java.util.Map;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.example.it_helpdesk_backend.entity.ITTicket;
import com.example.it_helpdesk_backend.entity.TicketComment;
import com.example.it_helpdesk_backend.enums.TicketStatus;
import com.example.it_helpdesk_backend.service.TicketService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/tickets")
@RequiredArgsConstructor
public class TicketController {

    private final TicketService ticketService;

    // EMPLOYEE can raise ticket
    @PreAuthorize("hasRole('EMPLOYEE')")
    @PostMapping("/{employeeId}")
    public ITTicket createTicket(
            @RequestBody ITTicket ticket,
            @PathVariable Long employeeId) {

        return ticketService.createTicket(ticket, employeeId);
    }

    // ADMIN / MANAGER / AGENT can view all tickets
    @PreAuthorize("hasAnyRole('ADMIN','IT_MANAGER','IT_SUPPORT_AGENT')")
    @GetMapping
    public List<ITTicket> getAllTickets() {

        return ticketService.getAllTickets();
    }

    // EMPLOYEE can view own tickets
    @PreAuthorize("hasRole('EMPLOYEE')")
    @GetMapping("/employee/{employeeId}")
    public List<ITTicket> getEmployeeTickets(
            @PathVariable Long employeeId) {

        return ticketService.getEmployeeTickets(employeeId);
    }

    // AGENT / MANAGER assign ticket
    @PreAuthorize("hasAnyRole('IT_SUPPORT_AGENT','IT_MANAGER','ADMIN')")
    @PutMapping("/{ticketId}/assign/{agentId}")
    public Map<String, String> assignTicket(
            @PathVariable Long ticketId,
            @PathVariable Long agentId) {

        ticketService.assignTicket(ticketId, agentId);

        return Map.of(
                "message",
                "Ticket assigned successfully"
        );
    }

    // AGENT / ADMIN update status
    @PreAuthorize("hasAnyRole('IT_SUPPORT_AGENT','ADMIN')")
    @PutMapping("/{ticketId}/status")
    public Map<String, String> updateStatus(
            @PathVariable Long ticketId,
            @RequestBody Map<String, String> body) {

        TicketStatus status =
                TicketStatus.valueOf(body.get("status"));

        ticketService.updateStatus(ticketId, status);

        return Map.of(
                "message",
                "Status updated successfully"
        );
    }

    // AGENT / ADMIN resolve
    @PreAuthorize("hasAnyRole('IT_SUPPORT_AGENT','ADMIN')")
    @PutMapping("/{ticketId}/resolve")
    public Map<String, String> resolveTicket(
            @PathVariable Long ticketId,
            @RequestBody Map<String, String> body) {

        String resolution =
                body.getOrDefault(
                        "resolution",
                        "Resolved"
                );

        ticketService.resolveTicket(
                ticketId,
                resolution
        );

        return Map.of(
                "message",
                "Ticket resolved successfully"
        );
    }

    // EMPLOYEE close ticket
    @PreAuthorize("hasRole('EMPLOYEE')")
    @PutMapping("/{ticketId}/close")
    public Map<String, String> closeTicket(
            @PathVariable Long ticketId) {

        ticketService.closeTicket(ticketId);

        return Map.of(
                "message",
                "Ticket closed successfully"
        );
    }

    // EMPLOYEE reopen ticket
    @PreAuthorize("hasRole('EMPLOYEE')")
    @PutMapping("/{ticketId}/reopen")
    public Map<String, String> reopenTicket(
            @PathVariable Long ticketId) {

        ticketService.reopenTicket(ticketId);

        return Map.of(
                "message",
                "Ticket reopened successfully"
        );
    }

    // MANAGER / ADMIN escalate
    @PreAuthorize("hasAnyRole('IT_MANAGER','ADMIN')")
    @PutMapping("/{ticketId}/escalate")
    public Map<String, String> escalateTicket(
            @PathVariable Long ticketId) {

        ticketService.escalateTicket(ticketId);

        return Map.of(
                "message",
                "Ticket escalated successfully"
        );
    }

    // Any logged-in user add comment
    @PreAuthorize("isAuthenticated()")
    @PostMapping("/{ticketId}/comments")
    public TicketComment addComment(
            @PathVariable Long ticketId,
            @RequestBody Map<String, Object> body) {

        Long userId =
                Long.valueOf(
                        body.get("userId").toString()
                );

        String comment =
                body.get("comment").toString();

        Boolean isInternal =
                Boolean.valueOf(
                        body.get("isInternal").toString()
                );

        return ticketService.addComment(
                ticketId,
                userId,
                comment,
                isInternal
        );
    }

    // Any logged-in user view comments
    @PreAuthorize("isAuthenticated()")
    @GetMapping("/{ticketId}/comments")
    public List<TicketComment> getComments(
            @PathVariable Long ticketId) {

        return ticketService.getComments(ticketId);
    }
}