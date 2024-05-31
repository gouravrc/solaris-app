package com.gouravrc.solaris.model;

import lombok.Data;
import org.springframework.http.HttpStatusCode;

@Data
public class ApplicationOfficerGetResponse {
    private HttpStatusCode status;
    private Object data;
    private Object error;
}
