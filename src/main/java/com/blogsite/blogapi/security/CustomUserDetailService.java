package com.blogsite.blogapi.security;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.blogsite.blogapi.exceptions.ResourceNotFoundException;
import com.blogsite.blogapi.models.User;
import com.blogsite.blogapi.repository.UserRepo;

@Service
public class CustomUserDetailService implements UserDetailsService {

    @Autowired
    private UserRepo userRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        User user = userRepo.findByName(username).orElseThrow(() -> new ResourceNotFoundException("User", "User Name: " + username + " Not found", 0));
        
        return new org.springframework.security.core.userdetails.User(
                user.getName(),
                user.getPassword(),
                user.getAuthorities() // or authorities
        );

    }

}
