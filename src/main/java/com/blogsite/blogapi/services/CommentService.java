package com.blogsite.blogapi.services;

import com.blogsite.blogapi.payloads.CommentDto;

public interface CommentService {

    CommentDto createComment(CommentDto commentDto, int pid);
    void deleteComment(int cid);
}
