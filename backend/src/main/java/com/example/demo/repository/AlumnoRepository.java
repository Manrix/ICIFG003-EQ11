package com.example.demo.repository;

import com.example.demo.entity.AlumnoEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AlumnoRepository extends CrudRepository<AlumnoEntity, Long> {
}
