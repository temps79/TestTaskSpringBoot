package com.example.testtask.repository;

import com.example.testtask.entity.Employee;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;
import java.util.Map;

@Transactional
@Repository
public interface EmployeeRepository extends PagingAndSortingRepository<Employee, Long>  {
    @Query("from Employee e where e.homeAddresses.territory.name IN(:district)  OR e.homeAddresses.territory.territory.name IN(:regions) ")
    Page<Employee> getFilter(@Param("district") List<String> district,@Param("regions") List<String> regions,Pageable pageable);

    @Query("from Employee e")
    Page<Employee> getFilter(Pageable pageable);

    @Query("select e.age ,count(e.age) from Employee e group by e.age  order by e.age")
    List<Object[]> getStat();

}
