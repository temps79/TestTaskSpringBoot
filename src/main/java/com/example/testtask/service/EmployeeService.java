package com.example.testtask.service;

import com.example.testtask.entity.District;
import com.example.testtask.entity.Region;
import com.example.testtask.repository.EmployeeRepository;
import com.example.testtask.entity.Employee;
import com.example.testtask.repository.HomeAdressesRepository;
import com.example.testtask.service.impl.IEmployeeService;
import org.hibernate.tool.schema.internal.exec.ScriptTargetOutputToFile;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class EmployeeService implements IEmployeeService {
    @Autowired
    private EmployeeRepository employeeRepository;
    @Autowired
    private HomeAdressesRepository homeAdressesRepository;

    @Override
    public List<Employee> getAllEmployees() {
        return (List<Employee>) employeeRepository.findAll();
    }
    @Override
    public Employee getEmployeeById(long employeeId) {
        Optional<Employee> obj=employeeRepository.findById(employeeId);
        return obj.get();
    }
    @Override
    public Employee addEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    @Override
    public Employee updateEmployee(long id,Employee employee) {
        Employee employeeById=getEmployeeById(id);

        employeeById.setFullName(employee.getFullName());
        employeeById.setAge(employee.getAge());
        employeeById.setOperationMode(employee.getOperationMode());
        employeeById.getHomeAddresses().getDistrict().setDistrict_name(employee.getHomeAddresses().getDistrict().getDistrict_name());
        employeeById.getHomeAddresses().setAddress(employee.getHomeAddresses().getAddress());
        Region region=homeAdressesRepository.getRegion(employee.getHomeAddresses().getDistrict().getRegion().getRegion_name());
        employeeById.getHomeAddresses().getDistrict().setRegion(region==null?employee.getHomeAddresses().getDistrict().getRegion() : region);

        return employeeRepository.save(employeeById);
    }

    @Override
    public void deleteEmployee(long employeeId) {
        Optional<Employee> employee=employeeRepository.findById(employeeId);
        employeeRepository.delete(employee.get());
    }

    @Override
    public List<Employee> findPaginated(int pageNo, int pageSize) {
        Pageable paging = PageRequest.of(pageNo, pageSize);
        Page<Employee> pagedResult = employeeRepository.findAll(paging);
        return pagedResult.toList();
    }


    @Override
    public List<Employee> getAllEmployeesSortBy(int pageNo, int pageSize, String sortBy) {
        Pageable paging = PageRequest.of(pageNo, pageSize,Sort.by(sortBy));
        Page<Employee> pagedResult = employeeRepository.findAll(paging);
        return pagedResult.toList();
    }


    @Override
    public List<Employee> getFilter(int pageNo, int pageSize, String sortBy, List<String> district, List<String> regions) {
        Pageable paging = PageRequest.of(pageNo, pageSize,Sort.by(sortBy));
        Page<Employee> pagedResult = employeeRepository.getFilter(district,regions, paging);
        return pagedResult.toList();
    }

    @Override
    public Map<Object,Object> getStat() {
        Map<Object, Object> map=new LinkedHashMap<>();
        for(Object[] obj:employeeRepository.getStat()){
            map.put(obj[0],obj[1]);
        }
        return map;
    }

}
