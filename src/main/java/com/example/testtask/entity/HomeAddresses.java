package com.example.testtask.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name="home_addresses")
@Data
@NoArgsConstructor
public class HomeAddresses {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long adr_id;

    @Column(name="address")
    private String address;

    @Column(name="district")
    private String district;

    @Column(name="region")
    private String region;

    @Override
    public String toString() {
        return "HomeAddressesEntity{" +
                "id=" + adr_id +
                ", address='" + address + '\'' +
                ", district='" + district + '\'' +
                ", region='" + region + '\'' +
                '}';
    }
}
