package com.example.testtask.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name="territory")
@Data
@NoArgsConstructor
public class Territory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="name")
    private String name;

    @ManyToOne(fetch = FetchType.EAGER,cascade = {CascadeType.PERSIST,CascadeType.MERGE,CascadeType.REFRESH})
    private Territory territory;

    @Override
    public String toString() {
        return "Territory{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", territory=" + territory +
                '}';
    }
}
