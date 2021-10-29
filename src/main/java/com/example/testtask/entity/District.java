package com.example.testtask.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;


@Entity
@Table(name="district")
@Data
@NoArgsConstructor
public class District {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long district_id;

    @Column(name="district_name")
    private String district_name;

    @ManyToOne(fetch = FetchType.EAGER,cascade = CascadeType.PERSIST)
    private Region region;

    @Override
    public String toString() {
        return "District{" +
                "district_id=" + district_id +
                ", district_name='" + district_name + '\'' +
                ", region=" + region +
                '}';
    }
}
