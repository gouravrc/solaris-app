package com.gouravrc.solaris.client;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import com.gouravrc.solaris.model.ApplicationOfficerGetRequest;
import com.gouravrc.solaris.model.ApplicationOfficerGetResponse;
import com.gouravrc.solaris.model.ApplicationStatusRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@Component
public class FirebaseOfficerApplicationClient {

    private static final String MASTER_LOAN_APPLICATION_PATH = "slr-loan-applications";
    private static final String MASTER_PATH = "slr-master-applications";
    private static final String LOAN_APPLICATION_PATH = "loan-applications";


    public ResponseEntity<?> getAllApplicationGetClient(ApplicationOfficerGetRequest applicationOfficerGetRequest){
        List<Object> getArrayList = new ArrayList<>();
        Firestore dbFirestore = FirestoreClient.getFirestore();

        ApiFuture<QuerySnapshot> documentReference =
                dbFirestore.collection(MASTER_LOAN_APPLICATION_PATH)
                        .get();
        try {
            List<QueryDocumentSnapshot> response  = documentReference.get().getDocuments();
            response.forEach(data -> getArrayList.add(data.getData()));

            ApplicationOfficerGetResponse applicationOfficerGetResponse = new ApplicationOfficerGetResponse();
            applicationOfficerGetResponse.setData(getArrayList);

            return new ResponseEntity<>(applicationOfficerGetResponse, HttpStatus.OK);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        } catch (ExecutionException e) {
            throw new RuntimeException(e);
        }
    }

    public ResponseEntity<?> searchApplicationById(String id){
        Map<String, Object> document;

        Firestore dbFirestore = FirestoreClient.getFirestore();
        DocumentReference documentReference =
                dbFirestore.collection(MASTER_LOAN_APPLICATION_PATH)
                        .document(id);

        ApiFuture<DocumentSnapshot> future = documentReference.get();
        try {
            ApplicationOfficerGetResponse applicationOfficerGetResponse = new ApplicationOfficerGetResponse();
            document = future.get().getData();
            applicationOfficerGetResponse.setData(document);
            return new ResponseEntity<>(applicationOfficerGetResponse, HttpStatus.OK);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        } catch (ExecutionException e) {
            throw new RuntimeException(e);
        }
    }

    public ResponseEntity<?> setApplicationClient(ApplicationStatusRequest applicationStatusRequest){
        Firestore dbFirestore = FirestoreClient.getFirestore();
        dbFirestore.collection(MASTER_LOAN_APPLICATION_PATH)
                .document(applicationStatusRequest.getId())
                .update("status",applicationStatusRequest.getStatus());

        dbFirestore.collection(MASTER_PATH).document(applicationStatusRequest.getUserId())
                .collection(LOAN_APPLICATION_PATH).document(applicationStatusRequest.getId())
                .update("status", applicationStatusRequest.getStatus());


        return new ResponseEntity<>(HttpStatus.OK);
    }

}
