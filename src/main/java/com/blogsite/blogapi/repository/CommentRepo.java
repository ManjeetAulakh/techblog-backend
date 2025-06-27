package com.blogsite.blogapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.blogsite.blogapi.models.Comment;

public interface CommentRepo extends JpaRepository<Comment, Integer>{

}
