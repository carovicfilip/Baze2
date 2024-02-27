package com.PISBP.dao;

import com.PISBP.entity.Vest;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class VestBaseInfo {
    Integer id;
    String naslov;
    String tag;
    Integer brojLajkova;
    Integer brojDislajkova;
    String datum;
    String nazivRubrike;

    public VestBaseInfo(Vest vest) {
        this.id= vest.getId();
        this.naslov = vest.getNaslov();
        this.tag = vest.getTag();
        this.brojLajkova = vest.getBrojLajkova();
        this.brojDislajkova = vest.getBrojDisajkova();
        this.datum = vest.getDate().toString().split(" ")[0];
        this.nazivRubrike = vest.getRubrika().getNaziv();
    }
}
