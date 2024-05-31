package com.gouravrc.solaris.model;

import lombok.Data;
import org.springframework.http.HttpStatus;

@Data
public class EvaluationResponse {
    private HttpStatus status;
    private String message;
    private Object data;
    private Object error;
}
