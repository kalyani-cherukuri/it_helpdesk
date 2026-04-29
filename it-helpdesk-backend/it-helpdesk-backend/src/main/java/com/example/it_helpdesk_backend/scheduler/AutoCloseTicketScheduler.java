package com.example.it_helpdesk_backend.scheduler;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.example.it_helpdesk_backend.entity.ITTicket;
import com.example.it_helpdesk_backend.enums.TicketStatus;
import com.example.it_helpdesk_backend.repository.TicketRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class AutoCloseTicketScheduler {

    private final TicketRepository ticketRepository;

    @Scheduled(fixedRate = 60000)
    public void autoCloseResolvedTickets() {

        List<ITTicket> resolvedTickets =
                ticketRepository.findByStatus(
                        TicketStatus.RESOLVED
                );

        for (ITTicket ticket : resolvedTickets) {

            if (ticket.getResolvedAt() == null) {
                continue;
            }

            LocalDateTime closeTime =
                    ticket.getResolvedAt().plusDays(3);

            if (LocalDateTime.now().isAfter(closeTime)) {

                ticket.setStatus(TicketStatus.CLOSED);
                ticket.setUpdatedAt(LocalDateTime.now());

                ticketRepository.save(ticket);

                System.out.println(
                    "Auto Closed Ticket: "
                    + ticket.getTicketNumber()
                );
            }
        }
    }
}