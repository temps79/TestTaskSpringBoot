package com.example.testtask.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name="employees")
@Data
@NoArgsConstructor
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="emp_id")
    private long emp_id;

    @Column(name="full_name")
    private String fullName;

    @Column(name="age")
    private int age;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "ope_id" )
    private OperationMode operationMode;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "adr_id")
    private HomeAddresses homeAddresses;

    public Employee(String fullName, int age) {
        this.fullName = fullName;
        this.age = age;
    }

    @Override
    public String toString() {
        return "Employee{" +
                "id=" + emp_id +
                ", fullName='" + fullName + '\'' +
                ", age=" + age +
                ", operationMode=" + operationMode +
                ", homeAddresses=" + homeAddresses +
                '}';
    }
}
