package com.blogsite.blogapi.services.Impl;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.blogsite.blogapi.models.Post;
import com.blogsite.blogapi.models.User;
import com.blogsite.blogapi.payloads.CategoryDto;
import com.blogsite.blogapi.payloads.PostDto;
import com.blogsite.blogapi.payloads.PostResponse;
import com.blogsite.blogapi.payloads.UserDto;
import com.blogsite.blogapi.exceptions.ResourceNotFoundException;
import com.blogsite.blogapi.models.Category;
import com.blogsite.blogapi.repository.CategoryRepo;
import com.blogsite.blogapi.repository.PostRepo;
import com.blogsite.blogapi.repository.UserRepo;
import com.blogsite.blogapi.services.PostService;

@Service
public class PostServiceImpl implements PostService {

    @Autowired
    private PostRepo postRepo;

    @Autowired
    private UserRepo userRepo;

    @Autowired    
    private CategoryRepo categoryRepo;

    @Autowired
    private ModelMapper mapper;

    @Override
    public PostDto createPost(PostDto postDto, int userId, int catId) {

        User user = userRepo.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "User Id", userId));

        Category category = categoryRepo.findById(catId)
                .orElseThrow(() -> new ResourceNotFoundException("Category", "Cat Id", catId));

        Post post = mapper.map(postDto, Post.class);
        post.setDate(new Date());
        post.setImage("Default.png");
        post.setUser(user);
        post.setCategory(category);

        Post savedPost = postRepo.save(post);
        
        PostDto postResponse = mapper.map(savedPost, PostDto.class);

    // ✅ Manually set userDto and categoryDto (using your naming) because modelmapper doesnot do nested objects mapping
        postResponse.setUser(mapper.map(user, UserDto.class));
        postResponse.setCategory(mapper.map(category, CategoryDto.class));

        return mapper.map(savedPost, PostDto.class);
    }

    @Override
    public PostDto updatePost(PostDto postDto, int pid) {
        Post post = postRepo.findById(pid)
                .orElseThrow(() -> new ResourceNotFoundException("Post", "Post Id", pid));
        
        if (postDto.getTitle() != null) post.setTitle(postDto.getTitle());
        if (postDto.getContent() != null) post.setContent(postDto.getContent());
        if (postDto.getImage() != null) post.setImage(postDto.getImage());
        if (postDto.getDate() != null) post.setDate(postDto.getDate());


        Post updatedPost = postRepo.save(post);
        return mapper.map(updatedPost, PostDto.class);

    }

    @Override
    public void deletePost(int pid) {
        Post post = postRepo.findById(pid)
                .orElseThrow(() -> new ResourceNotFoundException("Post", "Post Id", pid));

        postRepo.delete(post);
    }

    @Override
    public PostDto getById(int pid) {
        Post post = postRepo.findById(pid)
                .orElseThrow(() -> new ResourceNotFoundException("Post", "Post Id", pid));
        
        return mapper.map(post, PostDto.class);
    }

    @Override
    public List<PostDto> getAllPosts() {

        List<Post> posts = postRepo.findAll();
        List<PostDto> postsDto = posts.stream().map((post) -> mapper.map(post, PostDto.class))
                .collect(Collectors.toList());

        return postsDto;

    }

    @Override
    public List<PostDto> getUserPosts(int userId) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "User Id", userId));

        List<Post> posts = postRepo.findByUser(user);
        List<PostDto> postsDto = posts.stream().map((post) -> mapper.map(post, PostDto.class))
                .collect(Collectors.toList());

        return postsDto;
    }

    @Override
    public List<PostDto> getCatPosts(int catId) {
        Category category = categoryRepo.findById(catId)
                .orElseThrow(() -> new ResourceNotFoundException("Category", "Cat Id", catId));
        
        List<Post> posts = postRepo.findByCategory(category);
        List<PostDto> postsDto = posts.stream().map(post -> mapper.map(post, PostDto.class))
                .collect(Collectors.toList());
        
        return postsDto;
    }

    @Override
    public PostResponse getAllPostsPaging(int pageNumber, int pageSize, String sortBy, String sortDir) {
    
     Sort sort = (sortDir.equalsIgnoreCase("asc"))? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();

        // Pageable p = PageRequest.of(pageNumber, pageSize, Sort.by(sortBy).ascending());

        Pageable p = PageRequest.of(pageNumber, pageSize, sort);
        Page<Post> page = postRepo.findAll(p);
        List<Post> posts = page.getContent();

        List<PostDto> postsDto = posts.stream().map(post -> mapper.map(post, PostDto.class)).collect(Collectors.toList());

        PostResponse postResponse = new PostResponse();

        postResponse.setContent(postsDto);
        postResponse.setPageNumber(page.getNumber());
        postResponse.setPageSize(page.getSize());
        postResponse.setTotalElements(page.getTotalElements());
        postResponse.setTotalPages(page.getTotalPages());
        postResponse.setLastPage(page.isLast());

        return postResponse;
    }

    @Override
    public List<PostDto> searchPosts(String keyword) {
        List<Post> posts = postRepo.findByTitleContaining(keyword);
        List<PostDto> postsDto = posts.stream().map(post -> mapper.map(post, PostDto.class)).collect(Collectors.toList());
        
        return postsDto;
    }

}
