package com.example.demo.controller;

import com.example.demo.entity.CursoEntity;
import com.example.demo.interfaces.ICursoService;
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
    private ICursoService service;

    @GetMapping
    public Iterable<CursoEntity> getAll() {
        return service.getAllCursos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<CursoEntity> getById(@PathVariable Long id) {
        Optional<CursoEntity> curso = Optional.ofNullable(service.getCursoById(id));
        return curso.map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<CursoEntity> create(@RequestBody CursoEntity curso) {
        return new ResponseEntity<>(service.createCurso(curso), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CursoEntity> update(@PathVariable Long id, @RequestBody CursoEntity cursoDetails) {
        CursoEntity updatedCurso = service.updateCurso(id, cursoDetails);
        if (updatedCurso != null) {
            return new ResponseEntity<>(updatedCurso, HttpStatus.OK);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (service.existsById(id)) {
            service.deleteCurso(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}