package com.excelr.repo;

import java.util.Optional;
<<<<<<< HEAD
import org.springframework.data.jpa.repository.JpaRepository;
import com.excelr.model.User;

public interface UserRepo extends JpaRepository<User, Long> {  // Change Integer to Long for consistency with entity
    
    public Optional<User> findByUsername(String username);  // Correct method name to match field
=======

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.excelr.entity.User;
import java.util.List;


@Repository

public interface UserRepo extends JpaRepository<User, Integer>{
	Optional<User> findByName(String name);

>>>>>>> 7c1ffd08e58720d4f7269ce61d1b0af3a06d03bd
}
