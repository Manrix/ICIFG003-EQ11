package com.example.demo.controller;

import com.example.demo.entity.RegistroAsistenciaEntity;
import com.example.demo.interfaces.IRegistroAsistenciaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/v1/registros")
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

        boolean Existe = service.getRegistroByAlumnoIdAndFecha(registro.getAlumno().getId(), registro.getFecha()).isPresent();
        
        if (Existe) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("El alumno ya tiene un registro de asistencia para la fecha " + registro.getFecha());
        }

        return new ResponseEntity<>(service.createRegistro(registro), HttpStatus.CREATED);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.deleteRegistro(id);
        return ResponseEntity.noContent().build();
    }
}
