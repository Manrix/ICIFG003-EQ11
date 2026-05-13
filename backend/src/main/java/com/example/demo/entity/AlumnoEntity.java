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
    
    @NonNull
    private String rut;
    
    @ManyToOne
    @JoinColumn(name = "curso_id")
    private CursoEntity curso;

    @Enumerated(EnumType.STRING)
    private EstadoAlumno estado = EstadoAlumno.ACTIVO;
}
