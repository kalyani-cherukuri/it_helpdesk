package com.example.it_helpdesk_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.it_helpdesk_backend.entity.ITTicket;
import com.example.it_helpdesk_backend.entity.User;
import com.example.it_helpdesk_backend.enums.TicketStatus;

public interface TicketRepository extends JpaRepository<ITTicket, Long> {

    List<ITTicket> findByRaisedBy(User user);

    List<ITTicket> findByStatus(TicketStatus status);

    List<ITTicket> findByAssignedTo(User user);
    List<ITTicket> findByStatusIn(List<TicketStatus> statuses);
    long countByStatus(TicketStatus status);

    @Query("""
       select t.priority, count(t)
       from ITTicket t
       group by t.priority
    """)
    List<Object[]> countTicketsByPriority();

    @Query("""
       select u.name, count(t)
       from ITTicket t
       join t.assignedTo u
       group by u.name
    """)
    List<Object[]> agentWorkload();

    @Query(value = """
      SELECT priority,
      AVG(TIMESTAMPDIFF(HOUR, created_at, resolved_at))
      FROM it_tickets
      WHERE resolved_at IS NOT NULL
      GROUP BY priority
    """, nativeQuery = true)
    List<Object[]> avgResolutionTime();
}