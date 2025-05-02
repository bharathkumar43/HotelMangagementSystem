package com.excelr.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.excelr.entity.User;
import java.util.List;


@Repository

public interface UserRepo extends JpaRepository<User, Integer>{
	Optional<User> findByName(String name);

}
