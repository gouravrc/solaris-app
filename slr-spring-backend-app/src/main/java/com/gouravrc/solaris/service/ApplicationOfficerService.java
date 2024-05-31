package com.gouravrc.solaris.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.gouravrc.solaris.client.FirebaseOfficerApplicationClient;
import com.gouravrc.solaris.model.ApplicationOfficerGetRequest;
import com.gouravrc.solaris.model.ApplicationStatusRequest;
import com.gouravrc.solaris.model.EvaluationRequest;
import com.gouravrc.solaris.model.EvaluationResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.*;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@Service
public class ApplicationOfficerService {
    private static final String NATIONALISED_BANK = "Bank A";
    private static final String PRIVATISED_BANK = "Bank B";
    private static final String DOMESTIC = "domestic";
    private static final String COMMERCIAL = "commercial";
    private static final String NBC = "NBC.json";
    private static final String NBD = "NBD.json";
    private static final String PBC = "PBC.json";
    private static final String PBD = "PBD.json";
    private static final String MOCK_WEATHER_DETAILS = "mock_weather.json";
    private static final double INITIAL_SOLAR_EFFICIENT_COEFFICIENT = 0.2;


    @Autowired
    FirebaseOfficerApplicationClient firebaseOfficerApplicationClient;

    public ResponseEntity<?> allApplicationService(ApplicationOfficerGetRequest applicationOfficerGetRequest){
        if(applicationOfficerGetRequest.isAllApplication()){
            return firebaseOfficerApplicationClient.getAllApplicationGetClient(applicationOfficerGetRequest);
        }
        else {
            return firebaseOfficerApplicationClient.searchApplicationById(applicationOfficerGetRequest.getId());
        }
    }

    public ResponseEntity<?> setApplicationService(ApplicationStatusRequest applicationStatusRequest){
        return firebaseOfficerApplicationClient.setApplicationClient(applicationStatusRequest);
    }

    public ResponseEntity<?> evaluateLoanApplicationService(EvaluationRequest evaluationRequest){
        // From Request
        int getCibilScore = Integer.parseInt(evaluationRequest.getCibil());
        String getRtr = evaluationRequest.getRtr();
        String getCollateral = evaluationRequest.getCollateral();

        if(evaluationRequest.getBank().equals(PRIVATISED_BANK) && evaluationRequest.getType().equals(DOMESTIC)
        ){
            // Product Type - PBD
            int getCibilOrch = Integer.parseInt(this.loadOrchestration(PBD,"min_score"));
            String getRtrOrch = this.loadOrchestration(PBD,"rtr");
            String getCollateralOrch = this.loadOrchestration(PBD,"collateral");
            HashMap<Object, Object> reportHashMap = new HashMap<>();
            /** NEGATIVE REPORT CONDITION **/

            if((getCibilScore < getCibilOrch)){
                reportHashMap.put("cibil","failed");
            }
            if(!getRtr.equals(getRtrOrch)){
                reportHashMap.put("rtr","failed");
            }
            if(!getCollateral.equals(getCollateralOrch)){
                if(Objects.equals(getCollateralOrch, "Yes") && getCollateral.equals("No")){
                    reportHashMap.put("collateral","failed");
                }
            }
            /** POSITIVE REPORT CONDITION **/
            // call Client Class
            System.out.println(reportHashMap);
            if(reportHashMap.size() != 0){
                EvaluationResponse evaluationResponse = new EvaluationResponse();
                evaluationResponse.setData(reportHashMap);
                return new ResponseEntity<>(evaluationResponse, HttpStatus.OK);
            }
            else {
                double result = this.loadLocationWeatherDetails(
                        evaluationRequest.getLocation(),
                        String.valueOf(evaluationRequest.getCoverage()),
                        evaluationRequest.getMinusage()
                );
                EvaluationResponse evaluationResponse = new EvaluationResponse();
                evaluationResponse.setData(result);
                return new ResponseEntity<>(evaluationResponse, HttpStatus.OK);
            }
        }
        else if(evaluationRequest.getBank().equals(PRIVATISED_BANK) && evaluationRequest.getType().equals(COMMERCIAL)){
            // Product Type - PBC
            int getCibilOrch = Integer.parseInt(this.loadOrchestration(PBC,"min_score"));
            String getRtrOrch = this.loadOrchestration(PBC,"rtr");
            String getCollateralOrch = this.loadOrchestration(PBC,"collateral");
            HashMap<Object, Object> reportHashMap = new HashMap<>();
            /** NEGATIVE REPORT CONDITION **/
            if((getCibilScore < getCibilOrch)){
                reportHashMap.put("cibil","failed");
            }
            if(!getRtr.equals(getRtrOrch)){
                reportHashMap.put("rtr","failed");
            }
            if(!getCollateral.equals(getCollateralOrch)){
                if(Objects.equals(getCollateralOrch, "Yes") && getCollateral.equals("No")){
                    reportHashMap.put("collateral","failed");
                }
            }
            /** POSITIVE REPORT CONDITION **/
            // call Client Class
            System.out.println(reportHashMap);
            if(reportHashMap.size() != 0){
                EvaluationResponse evaluationResponse = new EvaluationResponse();
                evaluationResponse.setData(reportHashMap);
                return new ResponseEntity<>(evaluationResponse, HttpStatus.OK);
            }
            else {
                double result = this.loadLocationWeatherDetails(
                        evaluationRequest.getLocation(),
                        String.valueOf(evaluationRequest.getCoverage()),
                        evaluationRequest.getMinusage()
                );
                EvaluationResponse evaluationResponse = new EvaluationResponse();
                evaluationResponse.setData(result);
                return new ResponseEntity<>(evaluationResponse, HttpStatus.OK);
            }
        } else if (evaluationRequest.getBank().equals(NATIONALISED_BANK) && evaluationRequest.getType().equals(DOMESTIC)) {
            // Product Type - NBD
            int getCibilOrch = Integer.parseInt(this.loadOrchestration(NBD,"min_score"));
            String getRtrOrch = this.loadOrchestration(NBD,"rtr");
            String getCollateralOrch = this.loadOrchestration(NBD,"collateral");
            HashMap<Object, Object> reportHashMap = new HashMap<>();
            /** NEGATIVE REPORT CONDITION **/
            if((getCibilScore < getCibilOrch)){
                reportHashMap.put("cibil","failed");
            }
            if(!getRtr.equals(getRtrOrch)){
                reportHashMap.put("rtr","failed");
            }
            if(!getCollateral.equals(getCollateralOrch)){
                if(Objects.equals(getCollateralOrch, "Yes") && getCollateral.equals("No")){
                    reportHashMap.put("collateral","failed");
                }
            }
            /** POSITIVE REPORT CONDITION **/
            // call Client Class
            System.out.println(reportHashMap);
            if(reportHashMap.size() != 0){
                EvaluationResponse evaluationResponse = new EvaluationResponse();
                evaluationResponse.setData(reportHashMap);
                return new ResponseEntity<>(evaluationResponse, HttpStatus.OK);
            }
            else {
                double result = this.loadLocationWeatherDetails(
                        evaluationRequest.getLocation(),
                        String.valueOf(evaluationRequest.getCoverage()),
                        evaluationRequest.getMinusage()
                );
                EvaluationResponse evaluationResponse = new EvaluationResponse();
                evaluationResponse.setData(result);
                return new ResponseEntity<>(evaluationResponse, HttpStatus.OK);
            }
        }
        else{
            // Product Type - NBC
            int getCibilOrch = Integer.parseInt(this.loadOrchestration(NBC,"min_score"));
            String getRtrOrch = this.loadOrchestration(NBC,"rtr");
            String getCollateralOrch = this.loadOrchestration(NBC,"collateral");
            HashMap<Object, Object> reportHashMap = new HashMap<>();
            /** NEGATIVE REPORT CONDITION **/
            if((getCibilScore < getCibilOrch)){
                reportHashMap.put("cibil","failed");
            }
            if(!getRtr.equals(getRtrOrch)){
                reportHashMap.put("rtr","failed");
            }
            if(!getCollateral.equals(getCollateralOrch)){
                if(Objects.equals(getCollateralOrch, "Yes") && getCollateral.equals("No")){
                    reportHashMap.put("collateral","failed");
                }
            }
            /** POSITIVE REPORT CONDITION **/
            // call Client Class
            System.out.println(reportHashMap);
            if(reportHashMap.size() != 0){
                EvaluationResponse evaluationResponse = new EvaluationResponse();
                evaluationResponse.setData(reportHashMap);
                return new ResponseEntity<>(evaluationResponse, HttpStatus.OK);
            }
            else {
                double result = this.loadLocationWeatherDetails(
                        evaluationRequest.getLocation(),
                        String.valueOf(evaluationRequest.getCoverage()),
                        evaluationRequest.getMinusage()
                );
                EvaluationResponse evaluationResponse = new EvaluationResponse();
                evaluationResponse.setData(result);
                return new ResponseEntity<>(evaluationResponse, HttpStatus.OK);
            }

        }
    }
    public String loadOrchestration(String fileName, String fieldName){
        String filePath = Objects.requireNonNull(getClass().getClassLoader().getResource(fileName)).getPath();
        ObjectMapper objectMapper = new ObjectMapper();
        String name;
        try {
            JsonNode jsonNode = objectMapper.readTree(new File(filePath));
            name = jsonNode.get(fieldName).asText();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return name;
    }

    public double loadLocationWeatherDetails(String location, String coverage, String minusage){
        String filePath = Objects.requireNonNull(getClass().getClassLoader().getResource(MOCK_WEATHER_DETAILS)).getPath();
        ObjectMapper objectMapper = new ObjectMapper();
        String locationStr;
        try {
            JsonNode jsonNode = objectMapper.readTree(new File(filePath));
            locationStr = String.valueOf(jsonNode.get(location));
            int predictedSolarValue = this.getSolarPredictedValue(locationStr,location);
            this.evaluationEngine(coverage, predictedSolarValue,minusage);
            return this.evaluationEngine(coverage, predictedSolarValue,minusage);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
    public int getSolarPredictedValue(String details, String location) {
        ObjectMapper mapper = new ObjectMapper();
        Map<String, Object> map;
        try {
            map = mapper.readValue(details, Map.class);
            int temp = (int) map.get("temperature");
            int wd = (int) map.get("wind_direction");
            int dp = (int) map.get("dew_point");
            int psr = (int) map.get("pressure");
            int ws = (int) map.get("wind_speed");
            int rh = (int) map.get("relative_humidity");
            /**
             * AT THIS POINT WE WILL CALL OUR ML MODEL VIA REST API
             * THE MODEL WILL RETURN A PREDICTED VALUE HERE
             * FOR SIMPLICITY LET US RETURN A MOCK VALUE
             * GULAMRG - 150512 w/m2
             * KOLKATA - 155505 w/m2
             * DARJEELING - 155515 w/m2
             * Jaipur - 159121 w/m2
             */
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
        if(location.equals("Jaipur")){
            return 159121;
        }
        else if(location.equals("Darjeeling")){
            return 155515;
        }
        else if(location.equals("Kolkata")){
            return 155505;
        }
        else if(location.equals("Gulmarg")){
            return 150512;
        }
        else if(location.equals("Mumbai")){
            return 159121;
        }
        else{
            return 159121;
        }
    }
    public double evaluationEngine(String coverage, int getSolarPredictedValue, String minusage){
        int getCoverage = Integer.parseInt(coverage);
        int minUsage = Integer.parseInt(minusage);

        double power = getCoverage*getSolarPredictedValue*INITIAL_SOLAR_EFFICIENT_COEFFICIENT;
        double kiloWatt = power/1000;
        double result = kiloWatt/minUsage;
        return result;
    }
}
