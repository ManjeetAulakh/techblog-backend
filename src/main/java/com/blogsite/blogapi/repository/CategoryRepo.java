package com.blogsite.blogapi.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.blogsite.blogapi.models.Category;

public interface CategoryRepo extends JpaRepository<Category, Integer>{

}
