package com.example.demo.interfaces;

import com.example.demo.entity.JustificativoEntity;
import com.example.demo.enums.EstadoJustificativo;

import java.util.Optional;

public interface JustificativoService {
    Iterable<JustificativoEntity> findAll();
    Optional<JustificativoEntity> findById(Long id);
    JustificativoEntity save(JustificativoEntity justificativo);
    Optional<JustificativoEntity> update(Long id, JustificativoEntity details);
    boolean deleteById(Long id);
    Iterable<JustificativoEntity> findByRegistroAsistenciaId(Long registroAsistenciaId);
    Iterable<JustificativoEntity> findByRegistroAsistenciaIdAndEstado(Long registroAsistenciaId, EstadoJustificativo estado);
}
