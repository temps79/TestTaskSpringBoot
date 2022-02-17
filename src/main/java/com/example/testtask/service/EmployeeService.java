package com.example.testtask.service;

import com.example.testtask.entity.*;
import com.example.testtask.repository.EmployeeRepository;
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
    @Autowired
    private HomeAddressesService homeAddressesService;

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
        List<String> regions=homeAdressesRepository.getAllRegions();
        try {
            if (regions.contains(employee.getHomeAddresses().getTerritory().getTerritory().getName())) {
                List<String> districs = homeAdressesRepository.getAllDistrics();
                Territory district;
                if (districs.contains(employee.getHomeAddresses().getTerritory().getName())) {
                    district = homeAdressesRepository.getDistrict(employee.getHomeAddresses().getTerritory().getName());
                } else {
                    Territory region = homeAdressesRepository.getRegion(employee.getHomeAddresses().getTerritory().getTerritory().getName());
                    district = employee.getHomeAddresses().getTerritory();
                    district.setTerritory(region);
                }
                HomeAddresses homeAddresses = employee.getHomeAddresses();
                homeAddresses.setTerritory(district);
                employee.setHomeAddresses(homeAddresses);
            }
        }
        catch (NullPointerException e){
            e.printStackTrace();
        }

        return employeeRepository.save(employee);
    }

    @Override
    public Employee updateEmployee(long id,Employee employee) {
        Employee employeeById=getEmployeeById(id);

        Territory district=homeAdressesRepository.getDistrict(employee.getHomeAddresses().getTerritory().getName()) ;
        Territory region=homeAdressesRepository.getRegion(employee.getHomeAddresses().getTerritory().getTerritory().getName());

        if(district==null){
            district=employee.getHomeAddresses().getTerritory();
        }
        district.setTerritory(region==null?employee.getHomeAddresses().getTerritory().getTerritory() : region);

        employeeById.setFullName(employee.getFullName());
        employeeById.setAge(employee.getAge());
        OperationMode mode=employee.getOperationMode();
        employeeById.setOperationMode(mode);
        employeeById.getHomeAddresses().setAddress(employee.getHomeAddresses().getAddress());

        employeeById.getHomeAddresses().setTerritory(district==null? employee.getHomeAddresses().getTerritory() : district);



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
    public List<Employee> getFilter(int pageNo, int pageSize, String sortBy) {
        Pageable paging = PageRequest.of(pageNo, pageSize,Sort.by(sortBy));
        Page<Employee> pagedResult = employeeRepository.getFilter(paging);
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
