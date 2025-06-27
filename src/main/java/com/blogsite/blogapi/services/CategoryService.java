package com.blogsite.blogapi.services;

import java.util.List;


import com.blogsite.blogapi.payloads.CategoryDto;

public interface CategoryService {

    CategoryDto createCat(CategoryDto categoryDto);
    CategoryDto updateCat(CategoryDto categoryDto, int catId);
    void deleteCat(int catId);
    List<CategoryDto> getAllCat();
    CategoryDto getById(int catId);
}
