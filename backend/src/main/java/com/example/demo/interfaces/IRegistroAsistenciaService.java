package com.example.demo.interfaces;

import java.util.List;

import com.example.demo.entity.RegistroAsistenciaEntity;

public interface IRegistroAsistenciaService {
    List<RegistroAsistenciaEntity> getAllRegistros();
    RegistroAsistenciaEntity getRegistroById(Long id);
    RegistroAsistenciaEntity createRegistro(RegistroAsistenciaEntity registro);
    RegistroAsistenciaEntity updateRegistro(Long id, RegistroAsistenciaEntity registro);
    void deleteRegistro(Long id);
    List<RegistroAsistenciaEntity> getRegistrosByAlumnoId(Long alumnoId);
    java.util.Optional<RegistroAsistenciaEntity> getRegistroByAlumnoIdAndFecha(Long alumnoId, java.time.LocalDate fecha);
}
