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

    @ManyToOne(fetch = FetchType.EAGER,cascade = {CascadeType.PERSIST,CascadeType.MERGE,CascadeType.REFRESH})
    private District district;



    @Override
    public String toString() {
        return "HomeAddressesEntity{" +
                "id=" + adr_id +
                ", address='" + address + '\'' +
                ", district='" + district+ '\'' +
                '}';
    }
}
