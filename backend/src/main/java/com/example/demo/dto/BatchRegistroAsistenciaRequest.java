package com.example.demo.dto;

import com.example.demo.entity.RegistroAsistenciaEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BatchRegistroAsistenciaRequest {
    private List<RegistroAsistenciaEntity> registros;
}
