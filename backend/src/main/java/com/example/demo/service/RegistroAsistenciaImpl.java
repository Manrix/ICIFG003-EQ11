package com.example.demo.service;

import com.example.demo.entity.RegistroAsistenciaEntity;
import com.example.demo.interfaces.IRegistroAsistenciaService;
import com.example.demo.repository.RegistroAsistenciaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
        return repository.save(registro);
    }

    @Override
    public RegistroAsistenciaEntity updateRegistro(Long id, RegistroAsistenciaEntity registroDetails) {
        Optional<RegistroAsistenciaEntity> optionalRegistro = repository.findById(id);
        if (optionalRegistro.isPresent()) {
            RegistroAsistenciaEntity registro = optionalRegistro.get();
            registro.setAlumno(registroDetails.getAlumno());
            registro.setFecha(registroDetails.getFecha());
            registro.setHoraLlegada(registroDetails.getHoraLlegada());
            registro.setEstado(registroDetails.getEstado());
            registro.setObservacion(registroDetails.getObservacion());
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
}
