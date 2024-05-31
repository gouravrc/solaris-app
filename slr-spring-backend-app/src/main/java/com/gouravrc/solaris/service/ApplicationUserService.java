package com.gouravrc.solaris.service;

import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.gouravrc.solaris.client.FirebaseUserApplicationClient;
import com.gouravrc.solaris.model.ApplicationCreateRequest;
import com.gouravrc.solaris.model.ApplicationCreateResponse;
import com.gouravrc.solaris.model.ApplicationGetRequest;
import com.gouravrc.solaris.model.ApplicationGetResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ApplicationUserService {

    @Autowired
    FirebaseUserApplicationClient firebaseUserApplicationClient;
    public ResponseEntity<ApplicationCreateResponse> applicationCreateService(ApplicationCreateRequest applicationCreateRequest){
        return firebaseUserApplicationClient.createApplicationClient(applicationCreateRequest);
    }

    public ResponseEntity<ApplicationGetResponse> applicationGetService(ApplicationGetRequest applicationGetRequest){
        List<Object> getArrayList = new ArrayList<>();
        List<QueryDocumentSnapshot> res = firebaseUserApplicationClient.getApplicationsClient(applicationGetRequest);
        res.forEach(data -> getArrayList.add(data.getData()));
        System.out.println(getArrayList);

        ApplicationGetResponse applicationGetResponse = new ApplicationGetResponse();
        applicationGetResponse.setData(getArrayList);
        return new ResponseEntity<ApplicationGetResponse>(applicationGetResponse, HttpStatus.OK);
    }
}
