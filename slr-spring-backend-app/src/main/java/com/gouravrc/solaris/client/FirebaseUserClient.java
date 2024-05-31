package com.gouravrc.solaris.client;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.cloud.FirestoreClient;
import com.gouravrc.solaris.config.FirebaseConfig;
import com.gouravrc.solaris.model.UserSignInResponse;
import com.gouravrc.solaris.model.UserSigninRequest;
import com.gouravrc.solaris.model.UserSignupRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.LinkedHashMap;
import java.util.Objects;
import java.util.concurrent.ExecutionException;

@Component
public class FirebaseUserClient {

    @Autowired
    FirebaseConfig firebaseConfig;

    public ResponseEntity<?> createsignup(UserSignupRequest userSignupRequest){
        Timestamp ts1 = Timestamp.from(Instant.now());
        long val=ts1.getTime();
        String s =String.valueOf(val);
        String substring = s.substring(9);
        long aLong = Long.parseLong(substring);

        userSignupRequest.setId(aLong);

        Firestore dbFirestore = FirestoreClient.getFirestore();
        dbFirestore.collection("slr-user")
                .document(userSignupRequest.getUsername())
                .set(userSignupRequest);

        return new ResponseEntity<>(userSignupRequest, HttpStatus.OK);
    }

    public ResponseEntity<?> signinuser(UserSigninRequest userSigninRequest){
        DocumentSnapshot document;
        Firestore dbFirestore = FirestoreClient.getFirestore();
        DocumentReference documentReference =
                dbFirestore.collection("slr-user")
                        .document(userSigninRequest.getUsername());
        ApiFuture<DocumentSnapshot> future = documentReference.get();
        try {
            document = future.get();
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        } catch (ExecutionException e) {
            throw new RuntimeException(e);
        }
        String docPwd = String.valueOf(Objects.requireNonNull(document.getData()).get("pwd"));
        String docRole = String.valueOf(Objects.requireNonNull(document.getData()).get("role"));
        System.out.println("PASSWORD::::::"+docPwd);
        System.out.println("ROLE:::::::"+docRole);

        if(document.getData() == null){
            UserSignInResponse userSignInResponse = new UserSignInResponse();
            userSignInResponse.setMessage("User Does Not Exist");
            userSignInResponse.setStatus(HttpStatus.BAD_REQUEST);
            return new ResponseEntity<>(userSignInResponse, HttpStatus.BAD_REQUEST);
        }
        else {
            if(docPwd.equals(userSigninRequest.getPwd()) &&
                    docRole.equals(userSigninRequest.getRole())
            ){
                UserSignInResponse userSignInResponse = new UserSignInResponse();
                LinkedHashMap<Object, Object> linkedHashMap = new LinkedHashMap<>();
                linkedHashMap.put("username",document.getData().get("username"));
                linkedHashMap.put("id",document.getData().get("id"));
                linkedHashMap.put("role",document.getData().get("role"));
                userSignInResponse.setData(linkedHashMap);
                userSignInResponse.setStatus(HttpStatus.OK);
                return new ResponseEntity<>(userSignInResponse, HttpStatus.OK);
            }
            else {
                UserSignInResponse userSignInResponse = new UserSignInResponse();
                userSignInResponse.setData(null);
                userSignInResponse.setMessage("Incorrect Credentials");
                userSignInResponse.setStatus(HttpStatus.BAD_REQUEST);
                return new ResponseEntity<>(userSignInResponse, HttpStatus.BAD_REQUEST);
            }
        }
    }
}
