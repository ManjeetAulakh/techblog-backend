package com.blogsite.blogapi.payloads;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class PostDto {

    private int pid;

    @NotBlank
    private String title;

    @NotBlank
    @Size(min = 50)
    private String content;

    private Date date;
    private String image;
    private CategoryDto category;
    private UserDto user;

    private Set<CommentDto> comments= new HashSet<>();

}
