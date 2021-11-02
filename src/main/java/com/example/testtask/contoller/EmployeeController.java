package com.example.testtask.contoller;

import com.example.testtask.entity.District;
import com.example.testtask.entity.Employee;
import com.example.testtask.entity.HomeAddresses;
import com.example.testtask.entity.Region;
import com.example.testtask.service.impl.IEmployeeService;
import com.example.testtask.service.impl.IHomeAddressesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("api/v1")
public class EmployeeController {
    @Autowired
    private IEmployeeService employeeService;
    @Autowired
    private IHomeAddressesService homeAddressesService;


    @GetMapping("/employees")
    public Collection<Employee> getAllemployees() {
        List<Employee> list = employeeService.getAllEmployees();
        return list;
    }
    @PutMapping("edit/employee/id={id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable long id,@RequestBody Employee employee){
        return ResponseEntity.ok(employeeService.updateEmployee(id,employee));
    }
    @GetMapping("/employee/id={id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable long id){
        Employee employee=employeeService.getEmployeeById(id);
        return ResponseEntity.ok(employee);
    }
    @PostMapping("/add/employee")
    public Employee createEmployee(@RequestBody Employee employee){
        List<String> regions=homeAddressesService.getAllRegion();
        try {
            if (regions.contains(employee.getHomeAddresses().getDistrict().getRegion().getRegion_name())) {
                List<String> districs = homeAddressesService.getAllDistrics();
                District district;
                if (districs.contains(employee.getHomeAddresses().getDistrict().getDistrict_name())) {
                    district = homeAddressesService.getDistrict(employee.getHomeAddresses().getDistrict());
                } else {
                    Region region = homeAddressesService.getRegion(employee.getHomeAddresses().getDistrict().getRegion());
                    district = employee.getHomeAddresses().getDistrict();
                    district.setRegion(region);
                    district = homeAddressesService.addDistrict(district);
                }
                HomeAddresses homeAddresses = employee.getHomeAddresses();
                homeAddresses.setDistrict(district);
                employee.setHomeAddresses(homeAddresses);
            }
        }
        catch (NullPointerException e){

        }
        return employeeService.addEmployee(employee);
    }
    @GetMapping("/remove/id={id}")
    public ResponseEntity removeEmployeeById(@PathVariable long id){
        employeeService.deleteEmployee(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping(value = {"employees/{pageNo}/{pageSize}/{sortBy}/district={districts}/region={regions}",
            "employees/{pageNo}/{pageSize}/district={districts}/region={regions}",
            "employees/{pageNo}/{pageSize}/district={districts}",
            "employees/{pageNo}/{pageSize}"})
    public  ResponseEntity getFilterByDistrictAndRegionsEmployeesSortByName(@PathVariable int pageNo,
                                                                            @PathVariable int pageSize,
                                                                            @PathVariable(required = false) String sortBy,
                                                                            @PathVariable(required = false) List<String> districts,
                                                                            @PathVariable(required = false) List<String> regions){
        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.set("Access-Control-Expose-Headers","x-total-count");
        responseHeaders.add("x-total-count",String.valueOf(employeeService.getAllEmployees().size()));
        List<Employee> list=employeeService.getFilter(pageNo, pageSize,
                sortBy == null ? "fullName" : sortBy
                , districts
                , regions);
        if(districts.isEmpty() && regions.isEmpty()) {
            list =employeeService.getFilter(pageNo, pageSize, sortBy == null ? "fullName" : sortBy);
        }

        return ResponseEntity.ok()
                .headers(responseHeaders)
                .body(list);
    }

    @GetMapping("stat")
    public Map<Object,Object> getStat(){
        return  employeeService.getStat();
    }

}
