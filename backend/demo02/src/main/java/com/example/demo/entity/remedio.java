package com.example.demo.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class remedio {

    private Long id;

    private String nombreCientifico;
    private String marca;
    private Double gramos;
    private int anio;
    private char tipo; 
    private boolean controlado;

}