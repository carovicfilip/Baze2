package com.PISBP.service;

import com.PISBP.dao.NewVest;
import com.PISBP.dao.VestBaseInfo;
import com.PISBP.dao.VestResponse;
import com.PISBP.entity.Rubrika;
import com.PISBP.entity.User;
import com.PISBP.entity.Vest;
import com.PISBP.repository.RubrikaRepository;
import com.PISBP.repository.UserRepository;
import com.PISBP.repository.VestReposotory;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class VestService {
    private final VestReposotory vestReposotory;
    private final UserRepository userRepository;
    private final RubrikaRepository rubrikaRepository;

    public VestService(VestReposotory vestReposotory, UserRepository userRepository, RubrikaRepository rubrikaRepository) {
        this.vestReposotory = vestReposotory;
        this.userRepository = userRepository;
        this.rubrikaRepository = rubrikaRepository;
    }

    public boolean saveVest(NewVest vest){
        Optional<Rubrika> rubrika=rubrikaRepository.findByNaziv(vest.getRubrikaName());
        Optional<User> user = userRepository.findByUserName(vest.getUsername());

        Vest novaVest=Vest.builder()
                .date(new Date())
                .naslov(vest.getNaslov())
                .text(vest.getText())
                .brojLajkova(0)
                .brojDisajkova(0)
                .tag(vest.getTag())
                .rubrika(rubrika.orElse(null))
                .novinar(user.get())
                .state("draft").build();

        vestReposotory.save(novaVest);
        return true;
    }

    public List<VestBaseInfo> getAll() {
        List<Vest> vesti= vestReposotory.findAll();
        List<VestBaseInfo> res = vesti.stream().map(VestBaseInfo::new).toList();
        return res;
    }

    public List<VestBaseInfo> getTodays() {
        List<Vest> vesti= vestReposotory.findTodaysPublished();
        List<VestBaseInfo> res = vesti.stream().map(VestBaseInfo::new).toList();
        return res;
    }

    public List<VestBaseInfo> getEditableByUserId(Integer userId) {
        List<Vest> vesti= vestReposotory.findByNovinarIdAndStateIn(userId, List.of("draft","approving"));
        List<VestBaseInfo> res = vesti.stream().map(VestBaseInfo::new).toList();
        return res;
    }

    public VestResponse getById(Integer vestId) {
        Optional<Vest> ovest=vestReposotory.findById(vestId);
        if (ovest.isPresent()) {
            VestResponse vest = new VestResponse(ovest.get());
            return vest;
        }
        return null;
    }

    public void delete(Integer id){
        Optional<Vest> oVest=vestReposotory.findById(id);
        if (oVest.isPresent()){
            vestReposotory.delete(oVest.get());
        }
    }

    public void like(Integer id) {
        Optional<Vest> opvest=vestReposotory.findById(id);
        if (opvest.isPresent()){
            Vest vest= opvest.get();
            vest.setBrojLajkova(vest.getBrojLajkova()+1);
            vestReposotory.save(vest);
        }
    }

    public void dislike(Integer id) {
        Optional<Vest> opvest=vestReposotory.findById(id);
        if (opvest.isPresent()){
            Vest vest= opvest.get();
            vest.setBrojDisajkova(vest.getBrojDisajkova()+1);
            vestReposotory.save(vest);
        }
    }

    public boolean changeState(Integer vestId,String state){
        Optional<Vest> ovest = vestReposotory.findById(vestId);
        if (ovest.isPresent()){
            Vest vest=ovest.get();
            vest.setState(state);
            vestReposotory.save(vest);
            return true;
        }
        return false;
    }

    public List<VestBaseInfo> getByState(String state) {
        List<Vest> vesti= vestReposotory.findByState(state);
        List<VestBaseInfo> res = vesti.stream().map(VestBaseInfo::new).toList();
        return res;
    }

    public List<VestBaseInfo> getForApprove(Integer userId) {
        Optional<User> user=userRepository.findById(userId);
        if (user.isPresent()){
            List<Integer> rubrike = user.get().getRubrike().stream().map(Rubrika::getId).toList();
            return vestReposotory.findByStateAndRubrikaIdIn("approving",rubrike).stream().map(VestBaseInfo::new).toList();
        }
        return Collections.emptyList();
    }

    public void updateVest(NewVest vest, Integer id) {
        Optional<Vest> oVest = vestReposotory.findById(id);
        if(oVest.isPresent()){
            Vest vest1 = oVest.get();
            vest1.setNaslov(vest.getNaslov());
            vest1.setText(vest.getText());
            vest1.setTag(vest.getTag());
            Optional<Rubrika> rubrika = rubrikaRepository.findByNaziv(vest.getRubrikaName());
            vest1.setRubrika(rubrika.get());
            vestReposotory.save(vest1);
        }

    }
}
