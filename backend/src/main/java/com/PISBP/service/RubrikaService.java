package com.PISBP.service;

import com.PISBP.entity.Rubrika;
import com.PISBP.repository.RubrikaRepository;
import com.google.protobuf.Empty;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class RubrikaService {
    private final RubrikaRepository rubrikaRepository;

    public RubrikaService(RubrikaRepository rubrikaRepository) {
        this.rubrikaRepository = rubrikaRepository;
    }
    public List<Rubrika> getAll(){
        return rubrikaRepository.findAll();
    }
    public List<Rubrika> getByUser(){
        //List<Rubrika> rubrike=rubrikaRepository.findByUser();
        return Collections.emptyList();
    }
}
