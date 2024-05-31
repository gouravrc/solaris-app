package com.gouravrc.solaris.model;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import com.fasterxml.jackson.annotation.JsonInclude;
import org.apache.http.HttpStatus;

@Data
@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserSignUpModel {

    private HttpStatus status;
    private Object data;
    private Object error;
}
