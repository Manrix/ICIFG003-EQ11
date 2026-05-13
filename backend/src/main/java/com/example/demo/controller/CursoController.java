package com.example.demo.controller;

import com.example.demo.entity.CursoEntity;
import com.example.demo.repository.CursoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/v1/cursos")
@CrossOrigin(origins = "http://localhost:4200")
public class CursoController {

    @Autowired
    private CursoRepository repository;

    @GetMapping
    public Iterable<CursoEntity> getAll() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<CursoEntity> getById(@PathVariable Long id) {
        Optional<CursoEntity> curso = repository.findById(id);
        return curso.map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<CursoEntity> create(@RequestBody CursoEntity curso) {
        return new ResponseEntity<>(repository.save(curso), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CursoEntity> update(@PathVariable Long id, @RequestBody CursoEntity cursoDetails) {
        Optional<CursoEntity> optionalCurso = repository.findById(id);
        
        if (optionalCurso.isPresent()) {
            CursoEntity curso = optionalCurso.get();
            curso.setNombre(cursoDetails.getNombre());
            curso.setAño(cursoDetails.getAño());
            return new ResponseEntity<>(repository.save(curso), HttpStatus.OK);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}