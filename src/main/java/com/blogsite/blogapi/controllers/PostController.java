package com.blogsite.blogapi.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.blogsite.blogapi.config.AppConstants;
import com.blogsite.blogapi.payloads.ApiResponse;
import com.blogsite.blogapi.payloads.ImageResponse;
import com.blogsite.blogapi.payloads.PostDto;
import com.blogsite.blogapi.payloads.PostResponse;
import com.blogsite.blogapi.services.FileService;
import com.blogsite.blogapi.services.PostService;

import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;



@RestController
@RequestMapping("/api")
public class PostController {

    @Autowired
    private PostService postService;

    @Autowired
    private FileService fileService;

    @Value("${project.image}")
    private String path;

    @PostMapping("/user/{uid}/category/{cid}/posts")
    public ResponseEntity<PostDto> createPost(
        @RequestBody PostDto postDto,
        @PathVariable int uid,
        @PathVariable int cid
        ) {

        PostDto newPost = postService.createPost(postDto, uid, cid);
        return new ResponseEntity<>(newPost, HttpStatus.CREATED);
    }

    @GetMapping("/user/{uid}/posts")
    public ResponseEntity<List<PostDto>> postsByUsers(@PathVariable int uid) {

        List<PostDto> posts = postService.getUserPosts(uid);
        return new ResponseEntity<>(posts, HttpStatus.OK);
    }

    @GetMapping("/category/{cid}/posts")
    public ResponseEntity<List<PostDto>> postsByCategory(@PathVariable int cid) {

        List<PostDto> posts = postService.getCatPosts(cid);
        return new ResponseEntity<>(posts, HttpStatus.OK);
    }

    @GetMapping("/posts/{pid}")
    public ResponseEntity<PostDto> postById(@PathVariable int pid) {

        PostDto post = postService.getById(pid);
        return new ResponseEntity<>(post, HttpStatus.OK);
    }

    @GetMapping("/posts")
    public ResponseEntity<List<PostDto>> allPosts() {

        List<PostDto> posts = postService.getAllPosts();
        return new ResponseEntity<>(posts, HttpStatus.OK);
    }

    @PutMapping("/posts/{pid}")
    public ResponseEntity<PostDto> updatePost(@RequestBody PostDto postDto, @PathVariable int pid ){
        PostDto post = postService.updatePost(postDto, pid);
        return new ResponseEntity<>(post, HttpStatus.OK);
    }

    @DeleteMapping("/posts/{pid}")
    public ResponseEntity<ApiResponse> deletePost(@PathVariable int pid ){
        postService.deletePost(pid);
        return new ResponseEntity<>(new ApiResponse(true,"Successfully Deleted"), HttpStatus.OK);
    }
  
    @GetMapping("/posts/page")
    public ResponseEntity<PostResponse> allPostsPagewise(
        @RequestParam(value = "pageNumber", defaultValue = AppConstants.PAGE_NUMBER, required = false) int pageNumber,
        @RequestParam(value = "pageSize", defaultValue = AppConstants.PAZE_SIZE, required = false) int pageSize,
        @RequestParam(value = "sortBy", defaultValue = AppConstants.SORT_BY, required = false) String sortBy,
        @RequestParam(value = "sortDir", defaultValue = AppConstants.SORT_DIR, required = false) String sortDir

    ) {

        PostResponse response = postService.getAllPostsPaging(pageNumber, pageSize, sortBy, sortDir);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/posts/search/{keyword}")
    public ResponseEntity<List<PostDto>> searchPosts(@PathVariable String keyword){
        List<PostDto> posts = postService.searchPosts(keyword);
        return new ResponseEntity<>(posts, HttpStatus.OK);
    }

    @PostMapping("/post/image/upload/{postId}")
    public ResponseEntity<ImageResponse> uploadImage(
            @RequestParam("image") MultipartFile file,
            @PathVariable int postId
        ) {

        String fileName;
        try {
            PostDto postDto = postService.getById(postId);
            fileName = fileService.uploadImage(path, file);
            postDto.setImage(fileName);
            postService.updatePost(postDto, postId); 

        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>(new ImageResponse(null, "Upload Failed"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(new ImageResponse(fileName, "Upload Success"), HttpStatus.OK);
        
    }

    @GetMapping("/post/image/{imageName}")
    public void downloadImage(
            @PathVariable("imageName") String image,
            HttpServletResponse response
        ) throws IOException {
        InputStream resource = fileService.downloadImage(path, image);
        response.setContentType(MediaType.IMAGE_JPEG_VALUE);
        StreamUtils.copy(resource, response.getOutputStream());
    }
    
    
}
