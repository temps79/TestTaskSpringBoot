package com.example.testtask.repository;

import com.example.testtask.entity.District;
import com.example.testtask.entity.OperationMode;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Repository
public interface DistrictRepository extends PagingAndSortingRepository<District, Long> {

}
