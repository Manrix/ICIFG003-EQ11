package com.example.demo.service;

import com.example.demo.entity.UsuarioEntity;
import com.example.demo.interfaces.IUsuarioService;
import com.example.demo.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UsuarioServiceImpl implements IUsuarioService {

    @Autowired
    private UsuarioRepository repository;

    @Override
    public Iterable<UsuarioEntity> findAll() {
        return repository.findAll();
    }

    @Override
    public Optional<UsuarioEntity> findById(Long id) {
        return repository.findById(id);
    }

    @Override
    public UsuarioEntity save(UsuarioEntity e) {
        return repository.save(e);
    }

    @Override
    public Optional<UsuarioEntity> update(Long id, UsuarioEntity details) {
        Optional<UsuarioEntity> optionalUsuario = repository.findById(id);
        if (optionalUsuario.isPresent()) {
            UsuarioEntity usuario = optionalUsuario.get();
            usuario.setUsername(details.getUsername());
            usuario.setPassword(details.getPassword());
            usuario.setRol(details.getRol());
            return Optional.of(repository.save(usuario));
        }
        return Optional.empty();
    }

    @Override
    public boolean deleteById(Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public Optional<UsuarioEntity> findByUsername(String username) {
        return repository.findByUsername(username);
    }
}
