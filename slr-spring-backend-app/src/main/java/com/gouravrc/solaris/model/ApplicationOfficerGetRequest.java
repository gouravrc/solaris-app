package com.gouravrc.solaris.model;

import lombok.Data;

@Data
public class ApplicationOfficerGetRequest {
    private String id;
    private String userId;
    private boolean allApplication;
}
