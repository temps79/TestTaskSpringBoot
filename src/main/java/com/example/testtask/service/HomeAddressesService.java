package com.example.testtask.service;

import com.example.testtask.repository.HomeAdressesRepository;
import com.example.testtask.service.impl.IHomeAddressesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HomeAddressesService implements IHomeAddressesService {
    @Autowired
    private HomeAdressesRepository homeAdressesRepository;

    @Override
    public List<String> getAllUsageDistricts() {
        return homeAdressesRepository.getAllUsageDistricts();
    }

    @Override
    public List<String> getAllUsageRegions() {
        return homeAdressesRepository.getAllUsageRegions();
    }

    @Override
    public List<String> getAllRegions() {
        return homeAdressesRepository.getAllRegions();
    }


}
