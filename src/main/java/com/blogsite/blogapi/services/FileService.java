package com.blogsite.blogapi.services;

import java.io.IOException;
import java.io.InputStream;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public interface FileService {
    String uploadImage(String path, MultipartFile file) throws IOException;
    InputStream downloadImage(String path, String fileName) throws IOException;
}
