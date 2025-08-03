package com.blogsite.blogapi.services;

import java.util.List;

import com.blogsite.blogapi.payloads.UserDto;

public interface UserService {
    UserDto registerUser(UserDto user);
    UserDto createUser(UserDto user);
    UserDto updateUser(UserDto user, Integer id);
    UserDto getById(Integer id);
    List<UserDto> getAllUsers();
    void deleteUser(Integer id);
}
