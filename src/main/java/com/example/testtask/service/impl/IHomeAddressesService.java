package com.example.testtask.service.impl;

import com.example.testtask.entity.HomeAddresses;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface IHomeAddressesService {
    List<HomeAddresses> getAllHomeAddresses();
    HomeAddresses getHomeAddressesById(long homeAddressesId);
    void addHomeAddresses(HomeAddresses homeAddresses);
    void updateHomeAddresses(HomeAddresses homeAddresses);
    void deleteHomeAddresses(long homeAddressesId);
    List<String> getAllDistrics();
    List<String> getAllRegion();
}
