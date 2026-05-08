package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Data
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name="registro_asistencia")
public class RegistroAsistenciaEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "alumno_id")
    private AlumnoEntity alumno;
    
    @NonNull
    private String tipo;
    
    private LocalDate fecha;
    
    private String motivo;
}
