package com.example.demo.entity;

import javax.persistence.*;
import lombok.*;

@Data
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name="usuario")
public class UsuarioEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NonNull
    @Column(unique = true)
    private String username;
    
    @NonNull
    private String password;
    
    //@NonNull
    //private String rol;
}
