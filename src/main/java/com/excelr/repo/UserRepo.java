package com.excelr.repo;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.excelr.model.User;

public interface UserRepo extends JpaRepository<User, Long> {  // Change Integer to Long for consistency with entity
    
    public Optional<User> findByUsername(String username);  // Correct method name to match field
}
