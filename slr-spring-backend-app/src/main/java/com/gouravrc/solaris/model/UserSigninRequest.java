package com.gouravrc.solaris.model;

import lombok.Data;
import lombok.NonNull;

@Data
public class UserSigninRequest {
    @NonNull
    String username;
    @NonNull
    String pwd;
    @NonNull
    String role;
    long id;
}
