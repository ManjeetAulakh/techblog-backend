package com.blogsite.blogapi.services.Impl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.blogsite.blogapi.exceptions.ResourceNotFoundException;
import com.blogsite.blogapi.models.Category;
import com.blogsite.blogapi.payloads.CategoryDto;
import com.blogsite.blogapi.repository.CategoryRepo;
import com.blogsite.blogapi.services.CategoryService;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    CategoryRepo categoryRepo;

    @Autowired
    ModelMapper mapper;

    @Override
    public CategoryDto createCat(CategoryDto categoryDto) {
        Category cat = mapper.map(categoryDto, Category.class);
        Category savedCat = categoryRepo.save(cat);

        return mapper.map(savedCat, CategoryDto.class);
    }

    @Override
    public CategoryDto updateCat(CategoryDto categoryDto, int catId) {
        Category cat = categoryRepo.findById(catId)
                .orElseThrow(() -> new ResourceNotFoundException("Category", "Cat Id", catId));

        cat.setCatName(categoryDto.getCatName());
        cat.setCatAbout(categoryDto.getCatAbout());

        Category updatedCat = categoryRepo.save(cat);
        return mapper.map(updatedCat, CategoryDto.class);
    }

    @Override
    public void deleteCat(int catId) {
    Category cat = categoryRepo.findById(catId)
                .orElseThrow(() -> new ResourceNotFoundException("Category", "Cat Id", catId));
    
    categoryRepo.delete(cat);

    }

    @Override
    public List<CategoryDto> getAllCat() {
        List<Category> categories = categoryRepo.findAll();
        List<CategoryDto> categoryDtos = categories.stream().map((category) -> mapper.map(category, CategoryDto.class))
            .collect(Collectors.toList());
        
        return categoryDtos;
    }

    @Override
    public CategoryDto getById(int catId) {
        Category cat = categoryRepo.findById(catId)
            .orElseThrow(() -> new ResourceNotFoundException("Category", "Cat Id", catId));
        
        return mapper.map(cat, CategoryDto.class);
    }

}
