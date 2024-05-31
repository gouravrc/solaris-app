package com.gouravrc.solaris.client;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import com.gouravrc.solaris.model.ApplicationCreateRequest;
import com.gouravrc.solaris.model.ApplicationCreateResponse;
import com.gouravrc.solaris.model.ApplicationGetRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.util.concurrent.ExecutionException;

import java.util.List;


@Component
public class FirebaseUserApplicationClient {

    private static final String MASTER_LOAN_APPLICATION_PATH = "slr-loan-applications";
    private static final String MASTER_PATH = "slr-master-applications";
    private static final String LOAN_APPLICATION_PATH = "loan-applications";
    private static final String SUBMIT_STATUS = "Submitted";

    public ResponseEntity<ApplicationCreateResponse> createApplicationClient(ApplicationCreateRequest applicationCreateRequest){

        applicationCreateRequest.setStatus(SUBMIT_STATUS);
        Firestore dbFirestore = FirestoreClient.getFirestore();
        dbFirestore.collection(MASTER_PATH)
                .document(String.valueOf(applicationCreateRequest.getUserId()))
                .collection(LOAN_APPLICATION_PATH)
                .document(String.valueOf(applicationCreateRequest.getId()))
                .set(applicationCreateRequest);

        dbFirestore.collection(MASTER_LOAN_APPLICATION_PATH)
                .document(String.valueOf(applicationCreateRequest.getId()))
                .set(applicationCreateRequest);

        ApplicationCreateResponse applicationCreateResponse = new ApplicationCreateResponse();
        applicationCreateResponse.setData(applicationCreateRequest);
        applicationCreateResponse.setStatus(HttpStatus.OK);

        return new ResponseEntity<>(applicationCreateResponse, HttpStatus.OK);
    }

    public List<QueryDocumentSnapshot> getApplicationsClient(ApplicationGetRequest applicationGetRequest){
        List<QueryDocumentSnapshot> documentArr;
        ApiFuture<QuerySnapshot>  document;
        Firestore dbFirestore = FirestoreClient.getFirestore();
        CollectionReference documentReference =
                dbFirestore.collection(MASTER_PATH)
                        .document(String.valueOf(applicationGetRequest.getUserId()))
                        .collection(LOAN_APPLICATION_PATH);

        try {
            document = documentReference.get();
            documentArr = document.get().getDocuments();
            System.out.println(documentArr);
            return documentArr;
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        } catch (ExecutionException e) {
            throw new RuntimeException(e);
        }
    }
}
