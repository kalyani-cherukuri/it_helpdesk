package com.example.it_helpdesk_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.it_helpdesk_backend.entity.HardwareAsset;
import com.example.it_helpdesk_backend.enums.AssetStatus;

public interface HardwareAssetRepository
        extends JpaRepository<HardwareAsset,Long> {

    List<HardwareAsset> findByStatus(AssetStatus status);
    long countByStatus(AssetStatus status);

    @Query("""
      select h.assetType, count(h)
      from HardwareAsset h
      group by h.assetType
    """)
    List<Object[]> assetsByType();
}