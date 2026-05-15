package com.example.demo.repository;

import com.example.demo.entity.RegistroAsistenciaEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface RegistroAsistenciaRepository extends CrudRepository<RegistroAsistenciaEntity, Long> {
    List<RegistroAsistenciaEntity> findByAlumnoId(Long alumnoId);
    Optional<RegistroAsistenciaEntity> findByAlumnoIdAndFecha(Long alumnoId, LocalDate fecha);

    @Query("SELECT r FROM RegistroAsistenciaEntity r WHERE r.alumno.cursoId = ?1 AND r.fecha = ?2")
    List<RegistroAsistenciaEntity> findByAlumnoCursoIdAndFecha(Long cursoId, LocalDate fecha);
}
