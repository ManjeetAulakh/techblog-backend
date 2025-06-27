package com.blogsite.blogapi.services.Impl;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.blogsite.blogapi.exceptions.ResourceNotFoundException;
import com.blogsite.blogapi.models.Comment;
import com.blogsite.blogapi.models.Post;
import com.blogsite.blogapi.payloads.CommentDto;
import com.blogsite.blogapi.repository.CommentRepo;
import com.blogsite.blogapi.repository.PostRepo;
import com.blogsite.blogapi.services.CommentService;

@Service
public class CommentServiceImpl implements CommentService {

    @Autowired
    private CommentRepo commentRepo;

    @Autowired
    private PostRepo postRepo;

    @Autowired
    private ModelMapper mapper;

    @Override
    public CommentDto createComment(CommentDto commentDto, int pid) {
        Post post = postRepo.findById(pid).orElseThrow(() -> new ResourceNotFoundException("Post", "Pid", pid));

        Comment comment = mapper.map(commentDto, Comment.class);
        comment.setPost(post);
        Comment savedComment = commentRepo.save(comment);

        return mapper.map(savedComment, CommentDto.class);
    }

    @Override
    public void deleteComment(int cid) {
        Comment comment = commentRepo.findById(cid).orElseThrow(() -> new ResourceNotFoundException("Comment", "Cid", cid));
        commentRepo.delete(comment);
    }

}
