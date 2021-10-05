package com.example.testtask.service;

import com.example.testtask.repository.HomeAdressesRepository;
import com.example.testtask.entity.HomeAddresses;
import com.example.testtask.service.impl.IHomeAddressesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HomeAddressesService implements IHomeAddressesService {
    @Autowired
    private HomeAdressesRepository homeAdressesRepository;
    @Override
    public List<HomeAddresses> getAllHomeAddresses() {
        return (List<HomeAddresses>) homeAdressesRepository.findAll();
    }

    @Override
    public HomeAddresses getHomeAddressesById(long homeAddressesId) {
        HomeAddresses obj= homeAdressesRepository.findById(homeAddressesId).get();
        return obj;
    }

    @Override
    public void addHomeAddresses(HomeAddresses homeAddresses) {
        homeAdressesRepository.save(homeAddresses);
    }

    @Override
    public void updateHomeAddresses(HomeAddresses homeAddresses) {
        homeAdressesRepository.save(homeAddresses);
    }



    @Override
    public void deleteHomeAddresses(long homeAddressesId) {
        homeAdressesRepository.delete(homeAdressesRepository.findById(homeAddressesId).get());
    }

    @Override
    public List<String> getAllDistrics() {
        return homeAdressesRepository.getAllDistrics();
    }


    @Override
    public List<String> getAllRegion() {
        return homeAdressesRepository.getAllRegions();
    }

}
