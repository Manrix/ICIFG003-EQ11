package com.example.demo.interfaces;

import java.util.List;

import com.example.demo.entity.CursoEntity;

public interface ICursoService {
    List<CursoEntity> getAllCursos();
    CursoEntity getCursoById(Long id);
    CursoEntity createCurso(CursoEntity curso);
    void deleteCurso(Long id);
}
