package com.PISBP.service;

import com.PISBP.dao.NewComment;
import com.PISBP.entity.Komentar;
import com.PISBP.entity.Vest;
import com.PISBP.repository.KomentarRepository;
import com.PISBP.repository.VestReposotory;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CommentService {
    private final KomentarRepository komentarRepository;
    private final VestReposotory vestReposotory;

    public CommentService(KomentarRepository komentarRepository, VestReposotory vestReposotory) {
        this.komentarRepository = komentarRepository;
        this.vestReposotory = vestReposotory;
    }

    public void addNew(NewComment comment) {
        Vest vest=vestReposotory.getById(comment.getVestId());
        Komentar komentar=new Komentar();
        komentar.setVest(vest);
        komentar.setText(comment.getText());
        komentar.setUsername(comment.getUsername());
        komentar.setBrojLajkova(0);
        komentar.setBrojDislajkova(0);
        komentarRepository.save(komentar);
    }

    public void like(Integer id) {
        Optional<Komentar> opkom=komentarRepository.findById(id);
        if (opkom.isPresent()){
            Komentar kom= opkom.get();
            kom.setBrojLajkova(kom.getBrojLajkova()+1);
            komentarRepository.save(kom);
        }
    }

    public void dislike(Integer id) {
        Optional<Komentar> opkom=komentarRepository.findById(id);
        if (opkom.isPresent()){
            Komentar kom= opkom.get();
            kom.setBrojDislajkova(kom.getBrojDislajkova()+1);
            komentarRepository.save(kom);
        }
    }
}
