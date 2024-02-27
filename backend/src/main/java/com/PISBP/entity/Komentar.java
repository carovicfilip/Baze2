package com.PISBP.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Komentar {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer id;

    String username;

    String text;

    Integer brojLajkova;

    Integer brojDislajkova;

    @ManyToOne
    Vest vest;

}
