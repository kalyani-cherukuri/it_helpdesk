package com.example.it_helpdesk_backend.entity;

import com.example.it_helpdesk_backend.enums.Priority;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name="sla_configs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SLAConfig {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private Priority priority;

    private Integer resolutionTimeHours;

    private Integer escalationTimeHours;

    private Boolean isActive;
}