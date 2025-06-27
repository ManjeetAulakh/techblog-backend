package com.blogsite.blogapi.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blogsite.blogapi.payloads.ApiResponse;
import com.blogsite.blogapi.payloads.CommentDto;
import com.blogsite.blogapi.services.CommentService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @PostMapping("/post/{pid}/comments")
    public ResponseEntity<CommentDto> newComment(@RequestBody CommentDto commentDto, @PathVariable int pid) {
        
        CommentDto newComment = commentService.createComment(commentDto, pid);
        return new ResponseEntity<>(newComment, HttpStatus.CREATED);
    }

    @DeleteMapping("/comments/{cid}")
    public ResponseEntity<ApiResponse> deleteComment(@PathVariable int cid){
        commentService.deleteComment(cid);
        return new ResponseEntity<>(new ApiResponse(true, "Succesfully deleted"), HttpStatus.OK);
    }
    
}
