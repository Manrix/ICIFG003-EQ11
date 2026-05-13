package com.example.demo.controller;

import com.example.demo.dto.BatchRegistroAsistenciaRequest;
import com.example.demo.dto.BatchRegistroAsistenciaResponse;
import com.example.demo.entity.RegistroAsistenciaEntity;
import com.example.demo.interfaces.IRegistroAsistenciaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping({"/api/v1/registros", "/api/v1/registros-asistencia"})
@CrossOrigin(origins = "http://localhost:4200")
public class RegistroAsistenciaController {

    @Autowired
    private IRegistroAsistenciaService service;

    @GetMapping
    public Iterable<RegistroAsistenciaEntity> getAll() {
        return service.getAllRegistros();
    }

    @GetMapping("/alumno/{alumnoId}")
    public Iterable<RegistroAsistenciaEntity> getByAlumno(@PathVariable Long alumnoId) {
        return service.getRegistrosByAlumnoId(alumnoId);
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody RegistroAsistenciaEntity registro) {
        if (registro.getFecha() == null) {
            registro.setFecha(LocalDate.now());
        }

        if (registro.getAlumno() == null || registro.getAlumno().getId() == null) {
            return ResponseEntity.badRequest().body("El ID del alumno es obligatorio");
        }

        return new ResponseEntity<>(service.createRegistro(registro), HttpStatus.CREATED);
    }

    @PostMapping("/batch")
    public ResponseEntity<?> createBatch(@RequestBody BatchRegistroAsistenciaRequest request) {
        List<RegistroAsistenciaEntity> registros = request.getRegistros();
        if (registros == null || registros.isEmpty()) {
            return ResponseEntity.badRequest().body("La lista de registros no puede estar vacía");
        }

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
                .savedRecords(saved)
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
