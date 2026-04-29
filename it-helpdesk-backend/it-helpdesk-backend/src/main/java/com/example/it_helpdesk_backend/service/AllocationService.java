package com.example.it_helpdesk_backend.service;

import java.time.LocalDate;

import org.springframework.stereotype.Service;

import com.example.it_helpdesk_backend.entity.AssetAllocation;
import com.example.it_helpdesk_backend.entity.HardwareAsset;
import com.example.it_helpdesk_backend.entity.User;
import com.example.it_helpdesk_backend.enums.AllocationStatus;
import com.example.it_helpdesk_backend.enums.AssetStatus;
import com.example.it_helpdesk_backend.exception.BadRequestException;
import com.example.it_helpdesk_backend.exception.ResourceNotFoundException;
import com.example.it_helpdesk_backend.repository.AssetAllocationRepository;
import com.example.it_helpdesk_backend.repository.HardwareAssetRepository;
import com.example.it_helpdesk_backend.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import java.util.List;
@Service
@RequiredArgsConstructor
public class AllocationService {

    private final AssetAllocationRepository allocationRepo;
    private final HardwareAssetRepository assetRepo;
    private final UserRepository userRepo;

    public AssetAllocation allocate(
            Long assetId,
            Long employeeId,
            Long adminId) {

        HardwareAsset asset = assetRepo.findById(assetId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Asset not found"));

        if (asset.getStatus() != AssetStatus.AVAILABLE) {
            throw new BadRequestException("Asset unavailable");
        }

        User emp = userRepo.findById(employeeId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Employee not found"));

        User admin = userRepo.findById(adminId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Admin not found"));

        AssetAllocation allocation =
                AssetAllocation.builder()
                        .asset(asset)
                        .allocatedTo(emp)
                        .allocatedBy(admin)
                        .allocationDate(LocalDate.now())
                        .expectedReturnDate(LocalDate.now().plusDays(30))
                        .status(AllocationStatus.ACTIVE)
                        .build();

        asset.setStatus(AssetStatus.ALLOCATED);
        assetRepo.save(asset);

        return allocationRepo.save(allocation);
    }
    public List<AssetAllocation> getAll() {
    return allocationRepo.findAll();
}
public List<AssetAllocation> getEmployeeAssets(Long employeeId) {

    User user = userRepo.findById(employeeId)
        .orElseThrow(() ->
            new ResourceNotFoundException("User not found"));

    return allocationRepo.findByAllocatedTo(user);
}

    public AssetAllocation returnAsset(Long id) {

        AssetAllocation allocation = allocationRepo.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Allocation not found"));

        if (allocation.getStatus() == AllocationStatus.RETURNED) {
            throw new BadRequestException("Asset already returned");
        }

        allocation.setActualReturnDate(LocalDate.now());
        allocation.setStatus(AllocationStatus.RETURNED);

        HardwareAsset asset = allocation.getAsset();
        asset.setStatus(AssetStatus.AVAILABLE);

        assetRepo.save(asset);

        return allocationRepo.save(allocation);
    }
}