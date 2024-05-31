package com.gouravrc.solaris.model;

import lombok.Data;
import lombok.NonNull;

@Data
public class UserSignupRequest {
    private  String username;
    private String pwd;
    private String role;
    long id;
}
