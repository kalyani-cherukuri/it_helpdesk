package com.example.it_helpdesk_backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

import com.example.it_helpdesk_backend.enums.AssetStatus;

@Entity
@Table(name="hardware_assets")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HardwareAsset {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String assetTag;

    private String assetType;

    private String brand;

    private String model;

    @Column(unique = true)
    private String serialNumber;

    private LocalDate purchaseDate;

    private LocalDate warrantyExpiry;

    @Enumerated(EnumType.STRING)
    private AssetStatus status;
}