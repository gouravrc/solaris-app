package com.gouravrc.solaris.controller;

import com.gouravrc.solaris.model.ApplicationOfficerGetRequest;
import com.gouravrc.solaris.model.ApplicationStatusRequest;
import com.gouravrc.solaris.model.EvaluationRequest;
import com.gouravrc.solaris.service.ApplicationOfficerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ApplicationOfficerController {

    @Autowired
    ApplicationOfficerService applicationOfficerService;

    @PostMapping(value = "/search-applications", produces = "application/json", consumes = "application/json")
    public ResponseEntity<?> getAllApplicationController(@Valid @RequestBody ApplicationOfficerGetRequest applicationOfficerGetRequest){
        return applicationOfficerService.allApplicationService(applicationOfficerGetRequest);
    }

    @PostMapping(value = "/status-application", produces = "application/json", consumes = "application/json")
    public ResponseEntity<?> setApplicationStatusController(@Valid @RequestBody ApplicationStatusRequest applicationStatusRequest){
        return applicationOfficerService.setApplicationService(applicationStatusRequest);
    }
    @PostMapping(value = "/evaluate-application", produces = "application/json", consumes = "application/json")
    public ResponseEntity<?> evaluateLoanApplicationController(@Valid @RequestBody EvaluationRequest evaluationRequest){
        return applicationOfficerService.evaluateLoanApplicationService(evaluationRequest);
    }

}
