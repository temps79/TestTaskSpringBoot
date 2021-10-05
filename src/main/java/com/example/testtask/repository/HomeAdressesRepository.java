package com.example.testtask.repository;

import com.example.testtask.entity.Employee;
import com.example.testtask.entity.HomeAddresses;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Transactional
@Repository
public interface HomeAdressesRepository extends PagingAndSortingRepository<HomeAddresses, Long> {
    @Query("select distinct h.district from HomeAddresses h")
    List<String> getAllDistrics();
    @Query("select distinct h.region from HomeAddresses h")
    List<String> getAllRegions();
}
