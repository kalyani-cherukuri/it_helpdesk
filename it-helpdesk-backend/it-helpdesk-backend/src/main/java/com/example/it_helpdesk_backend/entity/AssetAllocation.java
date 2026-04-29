package com.example.it_helpdesk_backend.entity;

import java.time.LocalDate;

import com.example.it_helpdesk_backend.enums.AllocationStatus;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "asset_allocations")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonIgnoreProperties({
    "hibernateLazyInitializer",
    "handler"
})
public class AssetAllocation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "asset_id")
    @JsonIgnoreProperties({
    "hibernateLazyInitializer",
    "handler"
})
    private HardwareAsset asset;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "allocated_to")
    @JsonIgnoreProperties({
    "password",
    "hibernateLazyInitializer",
    "handler"
})
    private User allocatedTo;

   @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "allocated_by")
    @JsonIgnoreProperties({
    "password",
    "hibernateLazyInitializer",
    "handler"
})
    private User allocatedBy;

    private LocalDate allocationDate;

    private LocalDate expectedReturnDate;

    private LocalDate actualReturnDate;

    private String conditionAtAllocation;

    private String conditionAtReturn;

    @Enumerated(EnumType.STRING)
    private AllocationStatus status;
}