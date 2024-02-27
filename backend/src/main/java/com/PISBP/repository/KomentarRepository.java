package com.PISBP.repository;

import com.PISBP.entity.Komentar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface KomentarRepository extends JpaRepository<Komentar, Integer> {
    Optional<Komentar> findById(Integer id);
}
