package com.example.demo.dto;

import com.example.demo.enums.EstadoJustificativo;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class JustificativoDTO {
    private Long id;
    private Long registroAsistenciaId;
    private String motivo;
    private LocalDateTime fechaEnvio;
    private EstadoJustificativo estado;
    private String documento;
}
