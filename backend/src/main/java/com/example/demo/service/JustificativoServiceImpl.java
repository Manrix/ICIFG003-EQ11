package com.example.demo.service;

import com.example.demo.entity.JustificativoEntity;
import com.example.demo.entity.RegistroAsistenciaEntity;
import com.example.demo.enums.EstadoAsistencia;
import com.example.demo.interfaces.JustificativoService;
import com.example.demo.repository.JustificativoRepository;
import com.example.demo.repository.RegistroAsistenciaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Optional;

@Service
public class JustificativoServiceImpl implements JustificativoService {

    @Autowired
    private JustificativoRepository repository;

    @Autowired
    private RegistroAsistenciaRepository registroRepository;

    @Override
    public Iterable<JustificativoEntity> findAll() {
        return repository.findAll();
    }

    @Override
    public Optional<JustificativoEntity> findById(Long id) {
        return repository.findById(id);
    }

    @Override
    public JustificativoEntity save(JustificativoEntity justificativo) {
        validateAusente(justificativo);
        if (justificativo.getFechaEnvio() == null) {
            justificativo.setFechaEnvio(LocalDate.now());
        }
        return repository.save(justificativo);
    }

    @Override
    public Optional<JustificativoEntity> update(Long id, JustificativoEntity details) {
        Optional<JustificativoEntity> optionalJustificativo = repository.findById(id);
        if (optionalJustificativo.isPresent()) {
            JustificativoEntity justificativo = optionalJustificativo.get();
            justificativo.setMotivo(details.getMotivo());
            justificativo.setEstado(details.getEstado());
            justificativo.setDocumento(details.getDocumento());
            return Optional.of(repository.save(justificativo));
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
    public Iterable<JustificativoEntity> findByRegistroAsistenciaId(Long registroAsistenciaId) {
        return repository.findByRegistroAsistenciaId(registroAsistenciaId);
    }

    @Override
    public Iterable<JustificativoEntity> findByRegistroAsistenciaIdAndEstado(Long registroAsistenciaId, com.example.demo.enums.EstadoJustificativo estado) {
        return repository.findByRegistroAsistenciaIdAndEstado(registroAsistenciaId, estado);
    }

    private void validateAusente(JustificativoEntity justificativo) {
        RegistroAsistenciaEntity registro = registroRepository.findById(justificativo.getRegistroAsistencia().getId())
                .orElseThrow(() -> new IllegalArgumentException("Registro de asistencia no encontrado"));
        if (registro.getEstado() != EstadoAsistencia.AUSENTE) {
            throw new IllegalArgumentException("Solo se puede justificar un registro AUSENTE");
        }
    }
}
