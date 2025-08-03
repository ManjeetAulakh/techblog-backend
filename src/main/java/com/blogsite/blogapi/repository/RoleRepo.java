package com.blogsite.blogapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.blogsite.blogapi.models.Role;

public interface RoleRepo extends JpaRepository<Role, Integer> {

}
