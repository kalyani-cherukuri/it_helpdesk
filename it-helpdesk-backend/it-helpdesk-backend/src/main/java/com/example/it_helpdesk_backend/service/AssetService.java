package com.example.it_helpdesk_backend.service;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.it_helpdesk_backend.entity.AssetAllocation;
import com.example.it_helpdesk_backend.entity.HardwareAsset;
import com.example.it_helpdesk_backend.entity.User;
import com.example.it_helpdesk_backend.enums.AllocationStatus;
import com.example.it_helpdesk_backend.enums.AssetStatus;
import com.example.it_helpdesk_backend.repository.AssetAllocationRepository;
import com.example.it_helpdesk_backend.repository.HardwareAssetRepository;
import com.example.it_helpdesk_backend.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AssetService {

    private final HardwareAssetRepository assetRepository;
    private final AssetAllocationRepository allocationRepo;
    private final UserRepository userRepo;

    public HardwareAsset addAsset(HardwareAsset asset){
        asset.setStatus(AssetStatus.AVAILABLE);
        return assetRepository.save(asset);
    }

    public List<HardwareAsset> getAllAssets(){
        return assetRepository.findAll();
    }

    public List<HardwareAsset> getAvailableAssets(){
        return assetRepository.findByStatus(AssetStatus.AVAILABLE);
    }
    public List<AssetAllocation> getEmployeeAssets(Long employeeId) {

    User user = userRepo.findById(employeeId)
            .orElseThrow();

    return allocationRepo
        .findByAllocatedToAndStatus(
            user,
            AllocationStatus.ACTIVE
        );
}

    public HardwareAsset updateStatus(Long id, AssetStatus status){

        HardwareAsset asset =
            assetRepository.findById(id).orElseThrow();

        asset.setStatus(status);

        return assetRepository.save(asset);
    }
}