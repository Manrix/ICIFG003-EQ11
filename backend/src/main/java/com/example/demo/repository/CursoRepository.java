package com.example.demo.repository;

import com.example.demo.entity.CursoEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CursoRepository extends CrudRepository<CursoEntity, Long> {
}
