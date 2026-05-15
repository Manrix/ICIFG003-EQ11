package com.example.demo.entity;

import javax.persistence.*;
import lombok.*;
import com.example.demo.enums.EstadoAlumno;

@Data
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name="alumno")
public class AlumnoEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NonNull
    private String nombre;

    private String apellido;
    
    @NonNull
    private String rut;
    
    @Column(name = "curso_id")
    private Long cursoId;

    @Enumerated(EnumType.STRING)
    private EstadoAlumno estado = EstadoAlumno.ACTIVO;
}
