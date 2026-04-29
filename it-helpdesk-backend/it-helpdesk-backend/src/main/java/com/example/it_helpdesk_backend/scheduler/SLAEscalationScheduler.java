package com.example.it_helpdesk_backend.scheduler;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.example.it_helpdesk_backend.entity.*;
import com.example.it_helpdesk_backend.enums.TicketStatus;
import com.example.it_helpdesk_backend.repository.*;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class SLAEscalationScheduler {

    private final TicketRepository ticketRepository;
    private final SLAConfigRepository slaRepository;
    private final TicketEscalationLogRepository logRepository;

    @Scheduled(fixedRate = 60000)
    public void checkSlaBreaches() {

        List<ITTicket> tickets =
                ticketRepository.findByStatusIn(
                        List.of(
                                TicketStatus.OPEN,
                                TicketStatus.ASSIGNED,
                                TicketStatus.IN_PROGRESS
                        )
                );

        for (ITTicket ticket : tickets) {

            SLAConfig sla =
                    slaRepository.findByPriorityAndIsActive(
                            ticket.getPriority(), true
                    ).orElse(null);

            if (sla == null) continue;

            LocalDateTime escalateAt =
                    ticket.getCreatedAt()
                            .plusHours(sla.getEscalationTimeHours());

            if (LocalDateTime.now().isAfter(escalateAt)) {

                ticket.setStatus(TicketStatus.ESCALATED);
                ticket.setUpdatedAt(LocalDateTime.now());

                ticketRepository.save(ticket);

                TicketEscalationLog log =
                        TicketEscalationLog.builder()
                        .ticket(ticket)
                        .reason("SLA breached")
                        .escalationLevel(1)
                        .escalatedAt(LocalDateTime.now())
                        .build();

                logRepository.save(log);

                System.out.println(
                  "Ticket Escalated: " +
                   ticket.getTicketNumber()
                );
            }
        }
    }
}