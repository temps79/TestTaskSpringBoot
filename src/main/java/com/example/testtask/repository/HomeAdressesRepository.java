package com.example.testtask.repository;

import com.example.testtask.entity.District;
import com.example.testtask.entity.Employee;
import com.example.testtask.entity.HomeAddresses;
import com.example.testtask.entity.Region;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Transactional
@Repository
public interface HomeAdressesRepository extends PagingAndSortingRepository<HomeAddresses, Long> {
    @Query("select distinct d.district_name from District d")
    List<String> getAllDistrics();
    @Query("select distinct r.region_name from Region r")
    List<String> getAllRegions();
    @Query("from Region r where  r.region_name IN(:region) ")
    Region getRegion(@Param("region") String region);
    @Query("from District d where d.district_name IN(:district)  ")
    District getDistrict( @Param("district") String district);

}
