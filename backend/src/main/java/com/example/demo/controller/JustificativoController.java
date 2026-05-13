package com.example.demo.controller;

import com.example.demo.entity.JustificativoEntity;
import com.example.demo.interfaces.JustificativoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/v1/justificativos")
@CrossOrigin(origins = "http://localhost:4200")
public class JustificativoController {

    @Autowired
    private JustificativoService justificativoService;

    @GetMapping
    public Iterable<JustificativoEntity> getAll() {
        return justificativoService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<JustificativoEntity> getById(@PathVariable Long id) {
        Optional<JustificativoEntity> justificativo = justificativoService.findById(id);
        return justificativo.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody JustificativoEntity justificativo) {
        try {
            return new ResponseEntity<>(justificativoService.save(justificativo), HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody JustificativoEntity details) {
        try {
            return justificativoService.update(id, details)
                    .map(j -> new ResponseEntity<>(j, HttpStatus.OK))
                    .orElseGet(() -> ResponseEntity.notFound().build());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (justificativoService.deleteById(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/registro/{registroAsistenciaId}")
    public Iterable<JustificativoEntity> getByRegistroAsistenciaId(@PathVariable Long registroAsistenciaId) {
        return justificativoService.findByRegistroAsistenciaId(registroAsistenciaId);
    }
}
