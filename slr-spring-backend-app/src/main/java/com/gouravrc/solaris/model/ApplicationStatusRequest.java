package com.gouravrc.solaris.model;

import lombok.Data;

@Data
public class ApplicationStatusRequest {
    private String status;
    private String id;
    private String userId;
}
