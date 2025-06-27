package com.blogsite.blogapi.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blogsite.blogapi.payloads.ApiResponse;
import com.blogsite.blogapi.payloads.CategoryDto;
import com.blogsite.blogapi.services.CategoryService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/category")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @PostMapping
    public ResponseEntity<CategoryDto> createCategory(@Valid @RequestBody CategoryDto categoryDto) {
        CategoryDto catDto = categoryService.createCat(categoryDto);
        return new ResponseEntity<>(catDto, HttpStatus.CREATED);
    }

    @PutMapping("/{catId}")
    public ResponseEntity<CategoryDto> updateCategory(@Valid @RequestBody CategoryDto categoryDto, @PathVariable int catId) {
        CategoryDto catDto = categoryService.updateCat(categoryDto, catId);
        return new ResponseEntity<>(catDto, HttpStatus.OK);
    }

    @DeleteMapping("/{catId}")
    public ResponseEntity<ApiResponse> deleteCategory(@PathVariable int catId) {
        categoryService.deleteCat(catId);
        return new ResponseEntity<>(new ApiResponse(true,"SuccessFully deleted!"), HttpStatus.OK);
    }

    @GetMapping("/{catId}")
    public ResponseEntity<CategoryDto> getById(@PathVariable int catId) {
        CategoryDto catDto = categoryService.getById(catId);
        return new ResponseEntity<>(catDto, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<CategoryDto>> getAllCat() {
        List<CategoryDto> catDto = categoryService.getAllCat();
        return new ResponseEntity<>(catDto, HttpStatus.OK);
    }

}
