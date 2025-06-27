package com.blogsite.blogapi.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.blogsite.blogapi.models.User;

public interface UserRepo extends JpaRepository<User, Integer> {
    
    Optional<User> findByName(String name);
}
