package com.example.it_helpdesk_backend.controller;

import java.util.List;
import java.util.Map;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.it_helpdesk_backend.service.DashboardService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;

    // ADMIN / IT_MANAGER can view overall stats
    @PreAuthorize("hasAnyRole('ADMIN','IT_MANAGER')")
    @GetMapping("/stats")
    public Map<String, Object> stats() {
        return dashboardService.getStats();
    }

    // ADMIN / IT_MANAGER can view ticket priority analytics
    @PreAuthorize("hasAnyRole('ADMIN','IT_MANAGER')")
    @GetMapping("/tickets-priority")
    public List<Object[]> priority() {
        return dashboardService.ticketsByPriority();
    }

    // ADMIN / IT_MANAGER can view agent workload
    @PreAuthorize("hasAnyRole('ADMIN','IT_MANAGER')")
    @GetMapping("/agent-workload")
    public List<Object[]> workload() {
        return dashboardService.agentWorkload();
    }

    // ADMIN / IT_MANAGER can view asset utilization
    @PreAuthorize("hasAnyRole('ADMIN','IT_MANAGER')")
    @GetMapping("/asset-utilization")
    public List<Object[]> assets() {
        return dashboardService.assetUtilization();
    }

    // ADMIN / IT_MANAGER can view average resolution time
    @PreAuthorize("hasAnyRole('ADMIN','IT_MANAGER')")
    @GetMapping("/avg-resolution-time")
    public List<Object[]> avgTime() {
        return dashboardService.avgResolutionTime();
    }
}