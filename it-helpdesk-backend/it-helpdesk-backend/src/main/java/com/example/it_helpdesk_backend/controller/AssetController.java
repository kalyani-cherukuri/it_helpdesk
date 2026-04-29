package com.example.it_helpdesk_backend.controller;

import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.it_helpdesk_backend.entity.AssetAllocation;
import com.example.it_helpdesk_backend.entity.HardwareAsset;
import com.example.it_helpdesk_backend.service.AllocationService;
import com.example.it_helpdesk_backend.service.AssetService;


import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/assets")
@RequiredArgsConstructor
public class AssetController {
    private final AssetService assetService;
    private final AllocationService allocationService;
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public HardwareAsset addAsset(
            @RequestBody HardwareAsset asset){
        return assetService.addAsset(asset);
    }

    @PreAuthorize("hasAnyRole('ADMIN','IT_MANAGER')")
    @GetMapping
    public List<HardwareAsset> all(){
        return assetService.getAllAssets();
    }

    @PreAuthorize("hasAnyRole('ADMIN','IT_MANAGER')")
    @GetMapping("/available")
    public List<HardwareAsset> available(){
        return assetService.getAvailableAssets();
    }
    @PreAuthorize("hasRole('EMPLOYEE')")
@GetMapping("/employee/{employeeId}")
public List<AssetAllocation> myAssets(
        @PathVariable Long employeeId) {

    return allocationService.getEmployeeAssets(employeeId);
}
} 