package com.example.it_helpdesk_backend.service;

import java.util.*;

import org.springframework.stereotype.Service;

import com.example.it_helpdesk_backend.enums.*;
import com.example.it_helpdesk_backend.repository.*;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final UserRepository userRepository;
    private final TicketRepository ticketRepository;
    private final HardwareAssetRepository assetRepository;

    public Map<String,Object> getStats(){

        Map<String,Object> map = new HashMap<>();

        map.put("totalUsers", userRepository.count());

        map.put("openTickets",
                ticketRepository.countByStatus(
                        TicketStatus.OPEN));

        map.put("resolvedTickets",
                ticketRepository.countByStatus(
                        TicketStatus.RESOLVED));

        map.put("escalatedTickets",
                ticketRepository.countByStatus(
                        TicketStatus.ESCALATED));

        map.put("availableAssets",
                assetRepository.countByStatus(
                        AssetStatus.AVAILABLE));

        map.put("allocatedAssets",
                assetRepository.countByStatus(
                        AssetStatus.ALLOCATED));

        return map;
    }

    public List<Object[]> ticketsByPriority(){
        return ticketRepository.countTicketsByPriority();
    }

    public List<Object[]> agentWorkload(){
        return ticketRepository.agentWorkload();
    }

    public List<Object[]> assetUtilization(){
        return assetRepository.assetsByType();
    }

    public List<Object[]> avgResolutionTime(){
        return ticketRepository.avgResolutionTime();
    }
}