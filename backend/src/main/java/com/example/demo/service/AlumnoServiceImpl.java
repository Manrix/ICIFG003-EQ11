package com.example.demo.service;

import com.example.demo.entity.AlumnoEntity;
import com.example.demo.enums.EstadoAlumno;
import com.example.demo.interfaces.IAlumnoService;
import com.example.demo.repository.AlumnoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class AlumnoServiceImpl implements IAlumnoService {

    @Autowired
    private AlumnoRepository repository;

    @Override
    public List<AlumnoEntity> findAll() {
        return StreamSupport.stream(repository.findAll().spliterator(), false)
                .collect(Collectors.toList());
    }

    @Override
    public List<AlumnoEntity> findByCursoId(Long cursoId) {
        return repository.findByCursoId(cursoId);
    }

    @Override
    public AlumnoEntity findById(Long id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public AlumnoEntity save(AlumnoEntity alumno) {
        return repository.save(alumno);
    }

    @Override
    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    @Override
    public void deactivateById(Long id) {
        AlumnoEntity alumno = repository.findById(id).orElse(null);
        if (alumno != null) {
            alumno.setEstado(EstadoAlumno.INACTIVO);
            repository.save(alumno);
        }
    }
}
