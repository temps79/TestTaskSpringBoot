package com.example.testtask.contoller;

import com.example.testtask.entity.HomeAddresses;
import com.example.testtask.service.impl.IHomeAddressesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.AbstractMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/v1")
@CrossOrigin(origins = {"http://localhost:3000","http://192.168.1.121:3000"})
public class HomeAddressesController {
    @Autowired
    private IHomeAddressesService homeAddressesService;

    @GetMapping("/homeAddresses/regions")
    public List<String> getAllRegion(){
        return  homeAddressesService.getAllRegion();
    }
    @GetMapping("/homeAddresses/districts")
    public List<String> getAllDistrict(){
        return  homeAddressesService.getAllDistrics();
    }
}
