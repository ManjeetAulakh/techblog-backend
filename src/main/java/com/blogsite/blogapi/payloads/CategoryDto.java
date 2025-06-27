package com.blogsite.blogapi.payloads;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class CategoryDto {

    private int catId;

    @NotBlank(message = "Cat Name can't be Blank")
    private String catName;

    @Size(min = 3, message = "More then three charcters")
    private String catAbout;
}
