package com.example.testtask.repository;

import com.example.testtask.entity.OperationMode;
import com.example.testtask.entity.Region;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Repository
public interface RegionRepository extends PagingAndSortingRepository<Region, Long> {
}
