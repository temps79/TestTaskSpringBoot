package com.example.testtask.service.impl;

import com.example.testtask.entity.Employee;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

public interface IEmployeeService {
    List<Employee> getAllEmployees();
    Employee getEmployeeById(long employeeId);
    Employee addEmployee(Employee employee);
    Employee updateEmployee(long id,Employee employee);
    void deleteEmployee(long employeeId);
    List<Employee> findPaginated(int pageNo, int pageSize);
    List<Employee> getAllEmployeesSortBy(int pageNo, int pageSize,String sortBy);

    List<Employee> getFilter(int pageNo, int pageSize, String sortBy,@Param("district") List<String> district,@Param("regions") List<String> regions);

    Map<Object,Object> getStat();

}
