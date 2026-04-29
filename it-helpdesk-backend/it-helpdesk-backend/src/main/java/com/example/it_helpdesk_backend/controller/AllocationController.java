package com.example.it_helpdesk_backend.controller;
import java.util.List;
import java.util.Map;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.it_helpdesk_backend.entity.AssetAllocation;
import com.example.it_helpdesk_backend.service.AllocationService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/allocations")
@RequiredArgsConstructor
public class AllocationController {

    private final AllocationService allocationService;

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public List<AssetAllocation> all() {
        return allocationService.getAll();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/allocate")
    public AssetAllocation allocate(
        @org.springframework.web.bind.annotation.RequestBody
        Map<String, Long> body) {

        return allocationService.allocate(
            body.get("assetId"),
            body.get("employeeId"),
            body.get("adminId")
        );
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/return/{id}")
    public AssetAllocation returnAsset(
        @PathVariable Long id) {

        return allocationService.returnAsset(id);
    }
}