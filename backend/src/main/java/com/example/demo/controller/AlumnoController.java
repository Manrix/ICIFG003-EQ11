package com.example.demo.controller;

import com.example.demo.entity.AlumnoEntity;
import com.example.demo.interfaces.IAlumnoService;
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
    private IAlumnoService service;

    @GetMapping
    public Iterable<AlumnoEntity> getAll() {
        return service.findAll();
    }

    @PostMapping
    public ResponseEntity<AlumnoEntity> create(@RequestBody AlumnoEntity alumno) {
        return new ResponseEntity<>(service.save(alumno), HttpStatus.CREATED);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.deactivateById(id);
        return ResponseEntity.noContent().build();
    }
}
