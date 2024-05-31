package com.gouravrc.solaris.controller;

import com.gouravrc.solaris.model.UserSigninRequest;
import com.gouravrc.solaris.model.UserSignupRequest;
import com.gouravrc.solaris.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping(value = "/usersignup", consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> usersignup(@Valid @RequestBody UserSignupRequest userSignupRequest){
        return userService.signupserivce(userSignupRequest);
    }

    @PostMapping(value = "/usersignin", consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> signin(@Valid @RequestBody UserSigninRequest userSigninRequest){
        return userService.signin(userSigninRequest);

    }
}
