package com.example.testtask.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name="operation_mode")
@Data
public class OperationMode {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long opr_id;

    @Column(name="start_day")
    private Date startDay;

    @Column(name="end_day")
    private Date endDay;



    @Override
    public String toString() {
        return "OperationModeEntity{" +
                "id=" + opr_id +
                ", startDay=" + startDay +
                ", endDay=" + endDay +
                '}';
    }
}
