package com.blogsite.blogapi.exceptions;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.blogsite.blogapi.payloads.ApiResponse;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ApiResponse> ResourceNotFoundHandler(ResourceNotFoundException ex){
        String message = ex.getMessage();
        ApiResponse apiResponse = new ApiResponse(false,message);
        return new ResponseEntity<ApiResponse>(apiResponse,HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(LoginException.class)
    public ResponseEntity<ApiResponse> ResourceNotFoundHandler(LoginException ex){
        String message = ex.getMessage();
        ApiResponse apiResponse = new ApiResponse(false,message);
        return new ResponseEntity<ApiResponse>(apiResponse,HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String,String>> MethodArgumentNotValidExceptionHandler(MethodArgumentNotValidException ex){
        Map<String,String> responseBody = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
           String FieldName = ((FieldError)error).getField();
           String message = error.getDefaultMessage();
           responseBody.put(FieldName, message);
        });

        return new ResponseEntity<>(responseBody, HttpStatus.BAD_REQUEST);
    }
}
