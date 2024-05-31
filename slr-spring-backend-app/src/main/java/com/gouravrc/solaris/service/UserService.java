package com.gouravrc.solaris.service;

import com.gouravrc.solaris.client.FirebaseUserClient;
import com.gouravrc.solaris.model.UserSigninRequest;
import com.gouravrc.solaris.model.UserSignupRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    FirebaseUserClient firebaseUserClient;

    public ResponseEntity<?> signupserivce(UserSignupRequest userSignupRequest){
        return firebaseUserClient.createsignup(userSignupRequest);
    }

    public ResponseEntity<?> signin(UserSigninRequest userSigninRequest){
        return firebaseUserClient.signinuser(userSigninRequest);
    }
}
