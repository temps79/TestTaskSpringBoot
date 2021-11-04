package com.example.testtask.repository;

import com.example.testtask.entity.*;
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
    @Query("select distinct t.name from Territory t where t.territory is not null")
    List<String> getAllDistrics();

    @Query("select distinct e.homeAddresses.territory.name from Employee e ")
    List<String> getAllUsageDistricts();

    @Query("select distinct e.homeAddresses.territory.territory.name from Employee e ")
    List<String> getAllUsageRegions();

    @Query("select distinct t.name from Territory t where t.territory is null")
    List<String> getAllRegions();

    @Query(" from Territory t where  t.name =:region and t.territory is null")
    Territory getRegion(@Param("region") String region);

    @Query(" from Territory t where  t.name =:region and t.territory is null")
    List<Territory> getRegions(@Param("region") String region);

    @Query("from Territory t where  t.name IN(:district) and t.territory is not  null")
    Territory getDistrict( @Param("district") String district);

}
