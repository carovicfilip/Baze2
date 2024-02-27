package com.PISBP.dao;

import com.PISBP.entity.Vest;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class VestResponse {
    Integer id;

    String naslov;

    String text;

    String tag;

    Integer brojLajkova;

    Integer brojDisajkova;

    String date;

    String rubrika;

    String novinar;

    String state;

    List<KomentarData> komentari;

    public VestResponse(Vest vest){
        this.id=vest.getId();
        this.date=vest.getDate().toString();
        this.brojDisajkova= vest.getBrojDisajkova();
        this.brojLajkova= vest.getBrojLajkova();
        this.rubrika=vest.getRubrika().getNaziv();
        this.novinar=vest.getNovinar().getUserName();
        this.naslov= vest.getNaslov();
        this.text= vest.getText();
        this.tag= vest.getTag();
        this.state=vest.getState();
        this.komentari=vest.getKomentari().stream().map(KomentarData::new).toList();
    }
}
