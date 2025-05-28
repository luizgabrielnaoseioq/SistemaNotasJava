package com.nazax.sistemanotasjava.controller;

import com.nazax.sistemanotasjava.model.Nota;
import com.nazax.sistemanotasjava.repository.NotaRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notas")
@CrossOrigin(
    origins = "http://localhost:5173",
    allowedHeaders = "*",
    methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS}
)
public class NotaController {

    private final NotaRepository notaRepository;

    public NotaController(NotaRepository notaRepository) {
        this.notaRepository = notaRepository;
    }

    @GetMapping
    public List<Nota> getAllNotas() {
        return notaRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Nota> getNotaById(@PathVariable Long id) {
        return notaRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Nota> createNota(@Valid @RequestBody Nota nota) {
        Nota saved = notaRepository.save(nota);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Nota> updateNota(@PathVariable Long id, @Valid @RequestBody Nota notaDetails) {
        return notaRepository.findById(id)
                .map(nota -> {
                    nota.setTitulo(notaDetails.getTitulo());
                    nota.setDescricao(notaDetails.getDescricao());
                    return ResponseEntity.ok(notaRepository.save(nota));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNota(@PathVariable Long id) {
        if (!notaRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        notaRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
