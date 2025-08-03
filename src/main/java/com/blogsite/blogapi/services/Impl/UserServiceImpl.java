package com.blogsite.blogapi.services.Impl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.blogsite.blogapi.config.AppConstants;
import com.blogsite.blogapi.exceptions.ResourceNotFoundException;
import com.blogsite.blogapi.models.Role;
import com.blogsite.blogapi.models.User;
import com.blogsite.blogapi.payloads.UserDto;
import com.blogsite.blogapi.repository.RoleRepo;
import com.blogsite.blogapi.repository.UserRepo;
import com.blogsite.blogapi.services.UserService;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private RoleRepo roleRepo;

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

        // 👇 Clear user-role associations first to avoid constraint error
        user.getRoles().clear();
        userRepo.save(user); // Save updated user without roles

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

    @Override
    public UserDto registerUser(UserDto userDto) {
        User user = modelMapper.map(userDto, User.class);
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        Role role = roleRepo.findById(AppConstants.Normal).get();
        user.getRoles().add(role);
        User newUser = userRepo.save(user);
        return modelMapper.map(newUser, UserDto.class);
    }

}
