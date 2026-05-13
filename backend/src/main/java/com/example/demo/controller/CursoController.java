package com.example.demo.controller;

import com.example.demo.dto.CursoDTO;
import com.example.demo.dto.DTOMapper;
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

    @Autowired
    private DTOMapper mapper;

    @GetMapping
    public Iterable<CursoDTO> getAll() {
        return mapper.toCursoDTOList(service.getAllCursos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CursoDTO> getById(@PathVariable Long id) {
        Optional<CursoDTO> curso = Optional.ofNullable(mapper.toDTO(service.getCursoById(id)));
        return curso.map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<CursoDTO> create(@RequestBody CursoDTO curso) {
        return new ResponseEntity<>(mapper.toDTO(service.createCurso(mapper.toEntity(curso))), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CursoDTO> update(@PathVariable Long id, @RequestBody CursoDTO cursoDetails) {
        CursoDTO updatedCurso = mapper.toDTO(service.updateCurso(id, mapper.toEntity(cursoDetails)));
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