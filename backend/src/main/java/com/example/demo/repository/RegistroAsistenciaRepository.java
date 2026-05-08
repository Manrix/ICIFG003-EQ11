package com.example.demo.repository;

import com.example.demo.entity.RegistroAsistenciaEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RegistroAsistenciaRepository extends CrudRepository<RegistroAsistenciaEntity, Long> {
    List<RegistroAsistenciaEntity> findByAlumnoId(Long alumnoId);
}
