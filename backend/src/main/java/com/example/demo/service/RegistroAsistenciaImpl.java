package com.example.demo.service;

import com.example.demo.entity.RegistroAsistenciaEntity;
import com.example.demo.enums.EstadoAsistencia;
import com.example.demo.interfaces.IRegistroAsistenciaService;
import com.example.demo.repository.RegistroAsistenciaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class RegistroAsistenciaImpl implements IRegistroAsistenciaService {

    @Autowired
    private RegistroAsistenciaRepository repository;

    @Override
    public List<RegistroAsistenciaEntity> getAllRegistros() {
        return StreamSupport.stream(repository.findAll().spliterator(), false)
                .collect(Collectors.toList());
    }

    @Override
    public RegistroAsistenciaEntity getRegistroById(Long id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public RegistroAsistenciaEntity createRegistro(RegistroAsistenciaEntity registro) {
        validateHoraLlegada(registro);
        validateUniqueByAlumnoAndFecha(registro, null);
        return repository.save(registro);
    }

    @Override
    public RegistroAsistenciaEntity updateRegistro(Long id, RegistroAsistenciaEntity registroDetails) {
        Optional<RegistroAsistenciaEntity> optionalRegistro = repository.findById(id);
        if (optionalRegistro.isPresent()) {
            RegistroAsistenciaEntity registro = optionalRegistro.get();
            registro.setHoraLlegada(registroDetails.getHoraLlegada());
            registro.setObservacion(registroDetails.getObservacion());
            validateHoraLlegada(registro);
            validateUniqueByAlumnoAndFecha(registro, id);
            return repository.save(registro);
        }
        return null;
    }

    @Override
    public void deleteRegistro(Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
        }
    }

    @Override
    public List<RegistroAsistenciaEntity> getRegistrosByAlumnoId(Long alumnoId) {
        return StreamSupport.stream(repository.findByAlumnoId(alumnoId).spliterator(), false)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<RegistroAsistenciaEntity> getRegistroByAlumnoIdAndFecha(Long alumnoId, java.time.LocalDate fecha) {
        return repository.findByAlumnoIdAndFecha(alumnoId, fecha);
    }

    @Override
    public List<RegistroAsistenciaEntity> saveAll(List<RegistroAsistenciaEntity> registros) {
        for (RegistroAsistenciaEntity r : registros) {
            validateHoraLlegada(r);
        }

        long distinct = registros.stream()
                .map(r -> r.getAlumno().getId() + "#" + r.getFecha())
                .distinct()
                .count();
        if (distinct != registros.size()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Registros duplicados dentro del batch");
        }

        for (RegistroAsistenciaEntity r : registros) {
            validateUniqueByAlumnoAndFecha(r, null);
        }

        return StreamSupport.stream(repository.saveAll(registros).spliterator(), false)
                .collect(Collectors.toList());
    }

    private void validateHoraLlegada(RegistroAsistenciaEntity r) {
        if (r.getEstado() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El estado es obligatorio");
        }
        if (r.getEstado() == EstadoAsistencia.ATRASADO && r.getHoraLlegada() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "horaLlegada es obligatoria cuando el estado es ATRASADO");
        }
        if ((r.getEstado() == EstadoAsistencia.PRESENTE || r.getEstado() == EstadoAsistencia.AUSENTE) && r.getHoraLlegada() != null) {
            r.setHoraLlegada(null);
        }
    }

    private void validateUniqueByAlumnoAndFecha(RegistroAsistenciaEntity r, Long excludeId) {
        if (r.getAlumno() == null || r.getAlumno().getId() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El alumno es obligatorio");
        }
        Optional<RegistroAsistenciaEntity> existing = repository.findByAlumnoIdAndFecha(r.getAlumno().getId(), r.getFecha());
        if (existing.isPresent() && !existing.get().getId().equals(excludeId)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Ya existe un registro de asistencia para este alumno en esta fecha");
        }
    }
}
