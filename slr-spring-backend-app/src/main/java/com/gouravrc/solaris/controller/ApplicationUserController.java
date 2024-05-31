package com.gouravrc.solaris.controller;

import com.gouravrc.solaris.model.ApplicationCreateRequest;
import com.gouravrc.solaris.model.ApplicationCreateResponse;
import com.gouravrc.solaris.model.ApplicationGetRequest;
import com.gouravrc.solaris.model.ApplicationGetResponse;
import com.gouravrc.solaris.service.ApplicationUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ApplicationUserController {

    @Autowired
    ApplicationUserService applicationUserService;

    @PostMapping(value = "/application-create", produces = "application/json", consumes = "application/json")
    public ResponseEntity<ApplicationCreateResponse> createApplication(@Valid @RequestBody ApplicationCreateRequest applicationCreateRequest){
        return applicationUserService.applicationCreateService(applicationCreateRequest);
    }

    @PostMapping(value = "/applications", produces = "application/json", consumes = "application/json")
    public ResponseEntity<ApplicationGetResponse> createApplication(@Valid @RequestBody ApplicationGetRequest applicationGetRequest){
        return applicationUserService.applicationGetService(applicationGetRequest);
    }
}
