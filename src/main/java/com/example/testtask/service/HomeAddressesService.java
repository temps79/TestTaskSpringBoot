package com.example.testtask.service;

import com.example.testtask.entity.District;
import com.example.testtask.entity.Region;
import com.example.testtask.repository.DistrictRepository;
import com.example.testtask.repository.HomeAdressesRepository;
import com.example.testtask.entity.HomeAddresses;
import com.example.testtask.repository.RegionRepository;
import com.example.testtask.service.impl.IHomeAddressesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class HomeAddressesService implements IHomeAddressesService {
    @Autowired
    private HomeAdressesRepository homeAdressesRepository;
    @Autowired
    private DistrictRepository districtRepository;
    @Autowired
    private RegionRepository regionRepository;

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
    public District addDistrict(District district) {
        System.out.println(district);
        return districtRepository.save(district);
    }

    @Override
    public District getDistrict(District district) {
        return homeAdressesRepository.getDistrict(district.getDistrict_name());
    }

    @Override
    public Region getRegion(Region region) {
        return homeAdressesRepository.getRegion(region.getRegion_name());
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
