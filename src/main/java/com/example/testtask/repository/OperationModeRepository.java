package com.example.testtask.repository;

import com.example.testtask.entity.Employee;
import com.example.testtask.entity.OperationMode;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Transactional
@Repository
public interface OperationModeRepository extends PagingAndSortingRepository<OperationMode, Long> {

}
