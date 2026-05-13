package com.example.demo.interfaces;

import java.util.List;

import com.example.demo.entity.AlumnoEntity;

public interface IAlumnoService {
	
	public List<AlumnoEntity> findAll();

	public List<AlumnoEntity> findByCursoId(Long cursoId);
	
	public AlumnoEntity findById(Long id);
	
	AlumnoEntity save(AlumnoEntity alumno);
	
	void deleteById(long id);

}
