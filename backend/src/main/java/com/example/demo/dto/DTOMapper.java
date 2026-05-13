package com.example.demo.dto;

import com.example.demo.entity.AlumnoEntity;
import com.example.demo.entity.CursoEntity;
import com.example.demo.entity.JustificativoEntity;
import com.example.demo.entity.RegistroAsistenciaEntity;
import com.example.demo.enums.EstadoAlumno;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Component
public class DTOMapper {

    public CursoDTO toDTO(CursoEntity entity) {
        if (entity == null) return null;
        return CursoDTO.builder()
                .id(entity.getId())
                .nombre(entity.getNombre())
                .anio(entity.getAño() != null ? Integer.valueOf(entity.getAño()) : null)
                .build();
    }

    public CursoEntity toEntity(CursoDTO dto) {
        if (dto == null) return null;
        return CursoEntity.builder()
                .id(dto.getId())
                .nombre(dto.getNombre())
                .año(dto.getAnio() != null ? String.valueOf(dto.getAnio()) : null)
                .build();
    }

    public AlumnoDTO toDTO(AlumnoEntity entity) {
        if (entity == null) return null;
        return AlumnoDTO.builder()
                .id(entity.getId())
                .nombre(entity.getNombre())
                .apellido(entity.getApellido())
                .rut(entity.getRut())
                .estado(entity.getEstado() != null ? entity.getEstado().name() : null)
                .cursoId(entity.getCurso() != null ? entity.getCurso().getId() : null)
                .build();
    }

    public AlumnoEntity toEntity(AlumnoDTO dto) {
        if (dto == null) return null;
        AlumnoEntity entity = AlumnoEntity.builder()
                .id(dto.getId())
                .nombre(dto.getNombre())
                .apellido(dto.getApellido())
                .rut(dto.getRut())
                .estado(dto.getEstado() != null ? EstadoAlumno.valueOf(dto.getEstado()) : null)
                .build();
        if (dto.getCursoId() != null) {
            CursoEntity curso = new CursoEntity();
            curso.setId(dto.getCursoId());
            entity.setCurso(curso);
        }
        return entity;
    }

    public RegistroAsistenciaDTO toDTO(RegistroAsistenciaEntity entity) {
        if (entity == null) return null;
        Long cursoId = null;
        if (entity.getAlumno() != null && entity.getAlumno().getCurso() != null) {
            cursoId = entity.getAlumno().getCurso().getId();
        }
        return RegistroAsistenciaDTO.builder()
                .id(entity.getId())
                .alumnoId(entity.getAlumno() != null ? entity.getAlumno().getId() : null)
                .cursoId(cursoId)
                .fecha(entity.getFecha())
                .horaLlegada(entity.getHoraLlegada())
                .estado(entity.getEstado())
                .observacion(entity.getObservacion())
                .build();
    }

    public RegistroAsistenciaEntity toEntity(RegistroAsistenciaDTO dto) {
        if (dto == null) return null;
        RegistroAsistenciaEntity entity = RegistroAsistenciaEntity.builder()
                .id(dto.getId())
                .fecha(dto.getFecha())
                .horaLlegada(dto.getHoraLlegada())
                .estado(dto.getEstado())
                .observacion(dto.getObservacion())
                .build();
        if (dto.getAlumnoId() != null) {
            AlumnoEntity alumno = new AlumnoEntity();
            alumno.setId(dto.getAlumnoId());
            entity.setAlumno(alumno);
        }
        return entity;
    }

    public JustificativoDTO toDTO(JustificativoEntity entity) {
        if (entity == null) return null;
        return JustificativoDTO.builder()
                .id(entity.getId())
                .registroAsistenciaId(entity.getRegistroAsistencia() != null ? entity.getRegistroAsistencia().getId() : null)
                .motivo(entity.getMotivo())
                .fechaEnvio(entity.getFechaEnvio() != null ? entity.getFechaEnvio().atStartOfDay() : null)
                .estado(entity.getEstado())
                .documento(entity.getDocumento())
                .build();
    }

    public JustificativoEntity toEntity(JustificativoDTO dto) {
        if (dto == null) return null;
        JustificativoEntity entity = JustificativoEntity.builder()
                .id(dto.getId())
                .motivo(dto.getMotivo())
                .fechaEnvio(dto.getFechaEnvio() != null ? dto.getFechaEnvio().toLocalDate() : null)
                .estado(dto.getEstado())
                .documento(dto.getDocumento())
                .build();
        if (dto.getRegistroAsistenciaId() != null) {
            RegistroAsistenciaEntity registro = new RegistroAsistenciaEntity();
            registro.setId(dto.getRegistroAsistenciaId());
            entity.setRegistroAsistencia(registro);
        }
        return entity;
    }

    public List<CursoDTO> toCursoDTOList(Iterable<CursoEntity> entities) {
        return StreamSupport.stream(entities.spliterator(), false)
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public List<AlumnoDTO> toAlumnoDTOList(Iterable<AlumnoEntity> entities) {
        return StreamSupport.stream(entities.spliterator(), false)
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public List<RegistroAsistenciaDTO> toRegistroDTOList(Iterable<RegistroAsistenciaEntity> entities) {
        return StreamSupport.stream(entities.spliterator(), false)
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public List<JustificativoDTO> toJustificativoDTOList(Iterable<JustificativoEntity> entities) {
        return StreamSupport.stream(entities.spliterator(), false)
                .map(this::toDTO)
                .collect(Collectors.toList());
    }
}
