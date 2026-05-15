package com.example.demo.controller;

import com.example.demo.dto.AlumnoDTO;
import com.example.demo.dto.DTOMapper;
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

    @Autowired
    private DTOMapper mapper;

    @GetMapping
<<<<<<< Updated upstream
    public Iterable<AlumnoDTO> getAll(@RequestParam(required = false) Long cursoId) {
        if (cursoId != null) {
            return mapper.toAlumnoDTOList(service.findByCursoId(cursoId));
        }
        return mapper.toAlumnoDTOList(service.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AlumnoDTO> getById(@PathVariable Long id) {
        Optional<AlumnoDTO> alumno = Optional.ofNullable(mapper.toDTO(service.findById(id)));
        return alumno.map(ResponseEntity::ok)
                     .orElseGet(() -> ResponseEntity.notFound().build());
=======
    public Iterable<AlumnoEntity> getAll(@RequestParam(required = false) Long cursoId) {
        if (cursoId != null) {
            // Need to filter by cursoId, but since we return Iterable, I'll filter it via stream
            java.util.List<AlumnoEntity> filtered = new java.util.ArrayList<>();
            service.findAll().forEach(a -> {
                if (cursoId.equals(a.getCursoId())) {
                    filtered.add(a);
                }
            });
            return filtered;
        }
        return service.findAll();
>>>>>>> Stashed changes
    }

    @PostMapping
    public ResponseEntity<AlumnoDTO> create(@RequestBody AlumnoDTO alumno) {
        return new ResponseEntity<>(mapper.toDTO(service.save(mapper.toEntity(alumno))), HttpStatus.CREATED);
    }
<<<<<<< Updated upstream

    @PutMapping("/{id}")
    public ResponseEntity<AlumnoDTO> update(@PathVariable Long id, @RequestBody AlumnoDTO alumnoDetails) {
        AlumnoDTO updated = mapper.toDTO(service.save(mapper.toEntity(alumnoDetails)));
        if (updated != null) {
            return new ResponseEntity<>(updated, HttpStatus.OK);
        }
        return ResponseEntity.notFound().build();
    }

=======
    
    @PutMapping("/{id}")
    public ResponseEntity<AlumnoEntity> update(@PathVariable Long id, @RequestBody AlumnoEntity alumno) {
        alumno.setId(id);
        return ResponseEntity.ok(service.save(alumno));
    }
    
>>>>>>> Stashed changes
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.deactivateById(id);
        return ResponseEntity.noContent().build();
    }
}
