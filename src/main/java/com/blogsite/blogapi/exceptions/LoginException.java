package com.blogsite.blogapi.exceptions;

public class LoginException extends RuntimeException {

    public LoginException(String mess){
        super(mess);
    }

    public LoginException(){
        super();
    }
}
