package com.example.demo.interfaces;

import com.example.demo.entity.UsuarioEntity;
import java.util.Optional;

public interface UsuarioService {
    Iterable<UsuarioEntity> findAll();
    Optional<UsuarioEntity> findById(Long id);
    UsuarioEntity save(UsuarioEntity e);
    Optional<UsuarioEntity> update(Long id, UsuarioEntity details);
    boolean deleteById(Long id);
    Optional<UsuarioEntity> findByUsername(String username);
}
