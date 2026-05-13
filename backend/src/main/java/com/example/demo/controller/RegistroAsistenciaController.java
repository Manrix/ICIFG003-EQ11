package com.example.demo.controller;

import com.example.demo.dto.BatchRegistroAsistenciaRequest;
import com.example.demo.dto.BatchRegistroAsistenciaResponse;
import com.example.demo.dto.DTOMapper;
import com.example.demo.dto.RegistroAsistenciaDTO;
import com.example.demo.entity.RegistroAsistenciaEntity;
import com.example.demo.interfaces.IRegistroAsistenciaService;
import com.example.demo.repository.RegistroAsistenciaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping({"/api/v1/registros", "/api/v1/registros-asistencia"})
@CrossOrigin(origins = "http://localhost:4200")
public class RegistroAsistenciaController {

    @Autowired
    private IRegistroAsistenciaService service;

    @Autowired
    private RegistroAsistenciaRepository repository;

    @Autowired
    private DTOMapper mapper;

    @GetMapping
    public Iterable<RegistroAsistenciaDTO> getAll(
            @RequestParam(required = false) Long cursoId,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fecha,
            @RequestParam(required = false) Long alumnoId) {
        if (cursoId != null && fecha != null) {
            return mapper.toRegistroDTOList(repository.findByAlumnoCursoIdAndFecha(cursoId, fecha));
        } else if (alumnoId != null) {
            return mapper.toRegistroDTOList(service.getRegistrosByAlumnoId(alumnoId));
        }
        return mapper.toRegistroDTOList(service.getAllRegistros());
    }

    @GetMapping("/alumno/{alumnoId}")
    public Iterable<RegistroAsistenciaDTO> getByAlumno(@PathVariable Long alumnoId) {
        return mapper.toRegistroDTOList(service.getRegistrosByAlumnoId(alumnoId));
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody RegistroAsistenciaDTO registro) {
        RegistroAsistenciaEntity entity = mapper.toEntity(registro);
        if (entity.getFecha() == null) {
            entity.setFecha(LocalDate.now());
        }

        if (entity.getAlumno() == null || entity.getAlumno().getId() == null) {
            return ResponseEntity.badRequest().body("El ID del alumno es obligatorio");
        }

        return new ResponseEntity<>(mapper.toDTO(service.createRegistro(entity)), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody RegistroAsistenciaDTO registro) {
        RegistroAsistenciaEntity entity = mapper.toEntity(registro);
        RegistroAsistenciaEntity updated = service.updateRegistro(id, entity);
        if (updated != null) {
            return new ResponseEntity<>(mapper.toDTO(updated), HttpStatus.OK);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/batch")
    public ResponseEntity<?> createBatch(@RequestBody BatchRegistroAsistenciaRequest request) {
        List<RegistroAsistenciaDTO> dtos = request.getRegistros();
        if (dtos == null || dtos.isEmpty()) {
            return ResponseEntity.badRequest().body("La lista de registros no puede estar vacía");
        }

        List<RegistroAsistenciaEntity> registros = dtos.stream()
                .map(mapper::toEntity)
                .collect(Collectors.toList());

        for (RegistroAsistenciaEntity registro : registros) {
            if (registro.getFecha() == null) {
                registro.setFecha(LocalDate.now());
            }
            if (registro.getAlumno() == null || registro.getAlumno().getId() == null) {
                return ResponseEntity.badRequest().body("El ID del alumno es obligatorio para todos los registros");
            }
        }

        List<RegistroAsistenciaEntity> saved = service.saveAll(registros);
        BatchRegistroAsistenciaResponse response = BatchRegistroAsistenciaResponse.builder()
                .savedRecords(saved.stream().map(mapper::toDTO).collect(Collectors.toList()))
                .totalSaved(saved.size())
                .build();
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.deleteRegistro(id);
        return ResponseEntity.noContent().build();
    }
}
