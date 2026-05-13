package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AlumnoDTO {
    private Long id;
    private String nombre;
    private String apellido;
    private String rut;
    private String estado;
    private Long cursoId;
}
