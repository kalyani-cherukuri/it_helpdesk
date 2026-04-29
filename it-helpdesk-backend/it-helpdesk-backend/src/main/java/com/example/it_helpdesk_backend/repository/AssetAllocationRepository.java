package com.example.it_helpdesk_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.it_helpdesk_backend.entity.AssetAllocation;
import com.example.it_helpdesk_backend.entity.User;
import com.example.it_helpdesk_backend.enums.AllocationStatus;

public interface AssetAllocationRepository
        extends JpaRepository<AssetAllocation,Long> {

    List<AssetAllocation> findByAllocatedTo(User user);

    List<AssetAllocation> findByStatus(AllocationStatus status);
    List<AssetAllocation> findByAllocatedToAndStatus(
    User user,
    AllocationStatus status
);
}