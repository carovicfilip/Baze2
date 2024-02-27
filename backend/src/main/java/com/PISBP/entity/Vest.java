package com.PISBP.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Vest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;

    String naslov;

    String text;

    String tag;

    Integer brojLajkova;

    Integer brojDisajkova;

    Date date;

    String state;

    @ManyToOne
    Rubrika rubrika;

    @ManyToOne
    User novinar;

    @OneToMany(mappedBy = "vest")
    List<Komentar> komentari;
}
