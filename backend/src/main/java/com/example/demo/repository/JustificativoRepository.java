package com.example.demo.repository;

import com.example.demo.entity.JustificativoEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JustificativoRepository extends CrudRepository<JustificativoEntity, Long> {
    List<JustificativoEntity> findByRegistroAsistenciaId(Long registroAsistenciaId);
    List<JustificativoEntity> findByRegistroAsistenciaIdAndEstado(Long registroAsistenciaId, com.example.demo.enums.EstadoJustificativo estado);
}
