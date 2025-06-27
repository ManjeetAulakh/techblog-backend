package com.blogsite.blogapi.services.Impl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.blogsite.blogapi.exceptions.ResourceNotFoundException;
import com.blogsite.blogapi.models.User;
import com.blogsite.blogapi.payloads.UserDto;
import com.blogsite.blogapi.repository.UserRepo;
import com.blogsite.blogapi.services.UserService;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public UserDto createUser(UserDto user) {
        User savedUser = this.dtoToUser(user);
        savedUser = userRepo.save(savedUser);
        
        return this.userToDto(savedUser);
    }

    @Override
    public UserDto updateUser(UserDto userdto, Integer id) {
        User user = userRepo.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("User", "id",id));

        user.setName(userdto.getName());
        user.setEmail(userdto.getEmail());
        user.setPassword(userdto.getPassword());
        user.setAbout(userdto.getAbout());

        User updatedUser = userRepo.save(user);

        return this.userToDto(updatedUser);
    }

    @Override
    public UserDto getById(Integer id) {
        User user = userRepo.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
        
        return this.userToDto(user);
    }

    @Override
    public List<UserDto> getAllUsers() {
        List<User> users = userRepo.findAll();
        List<UserDto> userDtos = users.stream().map(user -> this.userToDto(user))
            .collect(Collectors.toList());

        return userDtos;
    }

    @Override
    public void deleteUser(Integer id) {
        User user = userRepo.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));

        userRepo.delete(user);
        
    }

    public User dtoToUser(UserDto userDto){

        User user = modelMapper.map(userDto, User.class);

        // User user = new User();
        // user.setId(userDto.getId());
        // user.setName(userDto.getName());
        // user.setEmail(userDto.getEmail());
        // user.setPassword(userDto.getPassword());
        // user.setAbout(userDto.getAbout());

        return user;
    }

    public UserDto userToDto (User user){

        UserDto userdto = modelMapper.map(user, UserDto.class);

        // UserDto userdto = new UserDto();
        // userdto.setId(user.getId());
        // userdto.setName(user.getName());
        // userdto.setEmail(user.getEmail());
        // userdto.setPassword(user.getPassword());
        // userdto.setAbout(user.getAbout());

        return userdto;
    }

}
