package com.PISBP.repository;


import com.PISBP.entity.Rubrika;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RubrikaRepository extends JpaRepository<Rubrika,Integer> {
    Optional<Rubrika> findByNaziv(String naziv);
}
