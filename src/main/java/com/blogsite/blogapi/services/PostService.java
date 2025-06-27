package com.blogsite.blogapi.services;

import java.util.List;

import com.blogsite.blogapi.payloads.PostDto;
import com.blogsite.blogapi.payloads.PostResponse;

public interface PostService {

    PostDto createPost(PostDto postDto, int userId, int catId);
    PostDto updatePost(PostDto postDto, int pid);
    void deletePost(int pid);
    PostDto getById(int pid);
    List<PostDto> getAllPosts();
    List<PostDto> getUserPosts(int userId);
    List<PostDto> getCatPosts(int catId);
    PostResponse getAllPostsPaging(int pageNumber, int pageSize, String sortBy, String sortDir);
    List<PostDto> searchPosts(String keyword);
}
