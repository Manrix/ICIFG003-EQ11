package com.example.demo.interfaces;

import java.util.List;

import com.example.demo.entity.PersonaEntity;

public interface iPersonaService {
	
	List<PersonaEntity> listarTodos();
	PersonaEntity findbyid(Long id);
	PersonaEntity save(PersonaEntity persona);

	void deletebyid(Long id);
	Object findAll();

}
