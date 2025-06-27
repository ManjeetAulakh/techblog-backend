package com.blogsite.blogapi.payloads;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class UserDto {

    private int id;

    @NotBlank
    @Size(min = 4, message = "User must 4 charcters ")
    private String name;

    @Email(message = "Email not valid!")
    private String email;

    @JsonIgnore
    @Size(min = 3, max = 10, message = "Must min 3 and max 10!")
    private String password;

    @NotBlank
    private String about;
}
