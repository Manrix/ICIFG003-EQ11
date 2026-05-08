package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.PersonaEntity;
import com.example.demo.interfaces.iPersonaService;
import com.example.demo.repository.PersonaRepository;

@Service

public class PersonaServiceImpl implements iPersonaService {
	@Autowired
	private PersonaRepository repositoryPersona;

	@Override
	public List<PersonaEntity> listarTodos() {
		Iterable<PersonaEntity> ipe = repositoryPersona.findAll();
		return (List<PersonaEntity>)ipe;
		
	}



	@Override
	public PersonaEntity findbyid(Long id) {
                return repositoryPersona.findById(id).orElse(null);
        }

        @Override
        public PersonaEntity save(PersonaEntity persona) {
                return repositoryPersona.save(persona);
        }

        @Override
        public void deletebyid(Long id) {
                repositoryPersona.deleteById(id);
        }


	public Object findAll() {
		// TODO Auto-generated method stub
		return null;
	}

}
