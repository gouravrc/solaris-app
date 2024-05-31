package com.gouravrc.solaris.model;

import lombok.Data;
import lombok.NonNull;

@Data
public class EvaluationRequest {
    private long id;
    @NonNull
    private String name;
    private int age;
    @NonNull
    private String pan;
    private String cibil;
    private String rtr;
    private String collateral;
    private String collateralAmount;
    private int coverage;
    private int loanamt;
    private String type;
    private String location;
    private int roofsize;
    private String bank;
    private String lat;
    private String lng;
    private String username;
    private int userId;
    private String status;
    private long createdDate;
    private String minusage;
}
