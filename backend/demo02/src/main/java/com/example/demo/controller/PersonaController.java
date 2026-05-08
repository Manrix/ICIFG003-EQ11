package com.example.demo.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.interfaces.iPersonaService;
import com.example.demo.entity.PersonaEntity;

@RestController
@CrossOrigin(origins = "http://localhost:4200", methods = {org.springframework.web.bind.annotation.RequestMethod.GET, org.springframework.web.bind.annotation.RequestMethod.POST, org.springframework.web.bind.annotation.RequestMethod.PUT, org.springframework.web.bind.annotation.RequestMethod.DELETE})
@RequestMapping("/api/v1/entities/persona")//https://localhost:8080//api/v1/entities/persona  
public class PersonaController {
	
	@Autowired
	private iPersonaService service;
	
	@GetMapping("/")
	public ResponseEntity<?> readPersonas(){
		try {
			return ResponseEntity.ok(service.listarTodos());
			
		}catch (Exception e) {
			return ResponseEntity.status(404).body(e);
		}
	}
	@GetMapping("/{id}")
	public ResponseEntity<?> readPersonaById(@PathVariable Long id){
		try {
			if (service.findbyid(id)== null) {
				return ResponseEntity.status(404).body("Persona no encontrada. ID: "+ id+ "\n");
			}else
				return ResponseEntity.ok(service.findbyid(id));
		}catch (Exception e) {
			e.printStackTrace();
			return null;
	}

	}
	@DeleteMapping("/{id}")
	public ResponseEntity<?> DeleteById(@PathVariable Long id){
		try {
			service.deletebyid(id);
			return ResponseEntity.ok().build(); // <-- Return empty body (HTTP 200) to avoid JSON parse errors in Angular
		}catch (Exception e) {
			return ResponseEntity.status(500).build();
		}

	}

	@PostMapping("/")
	public ResponseEntity<?> createPersona(@RequestBody PersonaEntity persona){
		try {
			return ResponseEntity.ok(service.save(persona));
		}catch (Exception e) {
			return ResponseEntity.status(500).body("Error al crear persona.\n");
		}
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<?> updatePersona(@PathVariable Long id, @RequestBody PersonaEntity persona){
		try {
			// Es recomendable setear el ID desde la ruta antes de guardar
			persona.setId(id);
			return ResponseEntity.ok(service.save(persona));
		}catch (Exception e) {
			return ResponseEntity.status(500).body("Error al actualizar persona.\n");
		}
	}
	
}
