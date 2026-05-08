package com.example.demo.controller;

import com.example.demo.entity.AlumnoEntity;
import com.example.demo.repository.AlumnoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/v1/alumnos")
@CrossOrigin(origins = "http://localhost:4200")
public class AlumnoController {

    @Autowired
    private AlumnoRepository repository;

    @GetMapping
    public Iterable<AlumnoEntity> getAll() {
        return repository.findAll();
    }

    @PostMapping
    public ResponseEntity<AlumnoEntity> create(@RequestBody AlumnoEntity alumno) {
        return new ResponseEntity<>(repository.save(alumno), HttpStatus.CREATED);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
