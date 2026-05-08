
package com.example.demo.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.remedio;

@Repository
public interface remedioRepository extends CrudRepository<remedio, Long>{

	Iterable<remedio> findAll();


}