package com.example.demo.controller;

import com.example.demo.dto.DTOMapper;
import com.example.demo.dto.JustificativoDTO;
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

    @Autowired
    private DTOMapper mapper;

    @GetMapping
    public Iterable<JustificativoDTO> getAll(@RequestParam(required = false) Long registroAsistenciaId) {
        if (registroAsistenciaId != null) {
            return mapper.toJustificativoDTOList(justificativoService.findByRegistroAsistenciaId(registroAsistenciaId));
        }
        return mapper.toJustificativoDTOList(justificativoService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<JustificativoDTO> getById(@PathVariable Long id) {
        Optional<JustificativoDTO> justificativo = Optional.ofNullable(mapper.toDTO(justificativoService.findById(id).orElse(null)));
        return justificativo.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody JustificativoDTO justificativo) {
        try {
            JustificativoEntity entity = mapper.toEntity(justificativo);
            return new ResponseEntity<>(mapper.toDTO(justificativoService.save(entity)), HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody JustificativoDTO details) {
        try {
            JustificativoEntity entity = mapper.toEntity(details);
            return justificativoService.update(id, entity)
                    .map(j -> new ResponseEntity<>(mapper.toDTO(j), HttpStatus.OK))
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
    public Iterable<JustificativoDTO> getByRegistroAsistenciaId(@PathVariable Long registroAsistenciaId) {
        return mapper.toJustificativoDTOList(justificativoService.findByRegistroAsistenciaId(registroAsistenciaId));
    }
}
