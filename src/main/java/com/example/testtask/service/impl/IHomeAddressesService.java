package com.example.testtask.service.impl;

import com.example.testtask.entity.District;
import com.example.testtask.entity.HomeAddresses;
import com.example.testtask.entity.Region;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface IHomeAddressesService {
    List<HomeAddresses> getAllHomeAddresses();
    HomeAddresses getHomeAddressesById(long homeAddressesId);
    void addHomeAddresses(HomeAddresses homeAddresses);
    District addDistrict(District district);
    District getDistrict(District district);
    Region getRegion(Region region);
    void updateHomeAddresses(HomeAddresses homeAddresses);
    void deleteHomeAddresses(long homeAddressesId);
    List<String> getAllDistrics();
    List<String> getAllRegion();
}
