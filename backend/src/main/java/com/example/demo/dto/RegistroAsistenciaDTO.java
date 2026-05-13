package com.example.demo.dto;

import com.example.demo.enums.EstadoAsistencia;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegistroAsistenciaDTO {
    private Long id;
    private Long alumnoId;
    private Long cursoId;
    private LocalDate fecha;
    private LocalTime horaLlegada;
    private EstadoAsistencia estado;
    private String observacion;
}
