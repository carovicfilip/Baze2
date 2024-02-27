package com.PISBP.dao;


import com.PISBP.entity.Komentar;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class KomentarData {
    Integer id;
    String username;

    String text;

    Integer brojLajkova;

    Integer brojDislajkova;
    public KomentarData(Komentar komentar){
        this.id=komentar.getId();
        this.brojDislajkova=komentar.getBrojDislajkova();
        this.brojLajkova=komentar.getBrojLajkova();
        this.username=komentar.getUsername();
        this.text=komentar.getText();
    }
}
