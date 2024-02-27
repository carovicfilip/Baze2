package com.PISBP.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Rubrika {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;

    String naziv;

    @ManyToMany(mappedBy = "rubrike")
    List<User> users;
}
