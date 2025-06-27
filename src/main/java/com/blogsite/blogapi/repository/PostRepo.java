package com.blogsite.blogapi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.blogsite.blogapi.models.Category;
import com.blogsite.blogapi.models.Post;
import com.blogsite.blogapi.models.User;

public interface PostRepo extends JpaRepository<Post, Integer>{

    List<Post> findByUser(User user);
    List<Post> findByCategory(Category category);

    List<Post> findByTitleContaining(String title);
}
