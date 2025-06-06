package com.nazax.sistemanotasjava.repository;

import com.nazax.sistemanotasjava.model.Nota;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NotaRepository extends JpaRepository<Nota, Long> {
}
