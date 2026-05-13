package com.example.demo.service;

import com.example.demo.entity.CursoEntity;
import com.example.demo.interfaces.ICursoService;
import com.example.demo.repository.CursoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class CursoServiceImpl implements ICursoService {

    @Autowired
    private CursoRepository repository;

    @Override
    public List<CursoEntity> getAllCursos() {
        return StreamSupport.stream(repository.findAll().spliterator(), false)
                .collect(Collectors.toList());
    }

    @Override
    public CursoEntity getCursoById(Long id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public CursoEntity createCurso(CursoEntity curso) {
        return repository.save(curso);
    }

    @Override
    public CursoEntity updateCurso(Long id, CursoEntity cursoDetails) {
        Optional<CursoEntity> optionalCurso = repository.findById(id);
        if (optionalCurso.isPresent()) {
            CursoEntity curso = optionalCurso.get();
            curso.setNombre(cursoDetails.getNombre());
            curso.setAño(cursoDetails.getAño());
            return repository.save(curso);
        }
        return null;
    }

    @Override
    public boolean existsById(Long id) {
        return repository.existsById(id);
    }

    @Override
    public void deleteCurso(Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
        }
    }
}
