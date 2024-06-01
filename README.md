# Solaris - Solar panel Optimization and Loan Assessment based on Radiation, Illumination System

<p align="center">
<img alt="Maintained | Yes" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
<img alt="Ask me anything" src="https://img.shields.io/badge/Ask%20me-anything-1abc9c.svg" />
</p>

# About 🤷 
An AI banking evaluation tool to assess loan for installation of Solar panels for domestic and commercial usage

#  Key Technolgies 🗝
1. Front End - React JS / Typescript / Axios
2. Back End - Java 17 / Springboot 
3. Cloud - Google Cloud Platform / Firebase / Firestore Database
4. Machine Learning - Python / LinearRegression / StandardScaler / pickle

# Project Structure and Setup ⛳
```
||_slr-python-solar-irradance-predictor - AI Model
||  |-global_heat_index.csv (dataset)
||  |-Solar_Radiation_model.ipynb
||
||_slr-react-frontend-app - UI Application
||  |-public
||  |-src
||  |-package.json
||  |-tsconfig.json
||
||_slr-sprint-backend-app - Rest API + GCP Cloud Configuration
||  |-src
||      |-main
||          |-resources
||              |-serviceAccount.json (GCP Cloud Configuration)
||  |-target
||  |-pom.xml
```
# Installation 📥 

<h3>Getting Started with Python</h3>
Install python and pip on your system. <a href="https://packaging.python.org/en/latest/tutorials/installing-packages">Click to setup</a>

Then
1. Fork/clone this repo
2. If you are opening in vscode, then you need to install `Jupyter lab`. For installation <a href="https://jupyter.org/">click here</a>
3. On vscode terminal ```cd slr-python-solar-irradance-predictor```
4. Run ```jupyter lab```
5. The application will run on port ```8888```
6. You can also run it in [Google Colab](https://colab.research.google.com/)
7. Follow instructions in <a href="https://margaretmz.medium.com/running-jupyter-notebook-with-colab-f4a29a9c7156">this link</a> to run it on Google Colab

<h3>Getting Started with Create React App</h3>
If you dont have npx, please download from <a href="https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b">this link</a>

Then
1. Fork/clone this repo.
2. ```cd slr-react-frontend-app ```
3. ```npm install```
4.  The local server will be up on ```3000```

<h3>Getting Started with Java Springboot</h3>
This Java application will required jdk 17 installed & maven. Please follow <a href="https://www.oracle.com/in/java/technologies/downloads">this link</a> to download and setup jdk.
To install maven <a href="https://www.javatpoint.com/how-to-install-maven">click here</a>

Then
1. Fork/clone this repo and open in IntelliJ
2. ```cd slr-spring-backend-app ```
3. ```mvn clean install```
4. Click on debug or run icon
5. On successfully build the spring application will run on port ```8080```

# ‼️ Disclaimer ‼️
The following information is provided for the purpose of sharing specific details relevant to this project. While every effort has been made to ensure the accuracy and completeness of the information, it is shared with the understanding that there may be omissions. Please see as below:
1. Since, I am using GCP Firebase for cloud integration in my project, I have to create ```serviceAccount.json``` file from firebase console and consume it in our Java application. As this file contains extremely confidential infomation which contains private keys and account information. The information in the file is ommited from the `slr-spring-backend-app/src/main/resources/serviceAccount.json`. You can create your serviceAccount.json by following below steps
    ```
    a. Go to https://console.cloud.google.com/apis/credentials
    b. On the top left there is a blue "create credentials" button click it and select "service account key." (see below if its not there)
    c. Choose the service account you want, and select "JSON" as the key type
    d. It should allow give you a json to download
    e. Copy and paste in the following path slr-spring-backend-app/src/main/resources
    ```

2. For simplicity, the Python model has not been deployed as a REST API. Initially, the plan was to deploy it using Flask and connect it with our Java REST API using RestTemplate. However, due to time constraints, the focus has been on building the prototype to demonstrate the application's real-time functionality and provide tangible outputs. Nevertheless, the model can still be run as a standalone application. We have mocked the python model response in 

    ```
    slr-spring-backend-app/src/main/java/com/gouravrc/solaris/service/ApplicationOfficerService.java
    ``` 

    Line number 235. method ```getSolarPredictedValue()``` [Click here to jump in](https://github.com/gouravrc/solaris-app/blob/main/slr-spring-backend-app/src/main/java/com/gouravrc/solaris/service/ApplicationOfficerService.java#L235)

3. I have mocked the location details and embeded inside Java application `slr-spring-backend-app/src/main/resources/mock_weather.json` [Click here to jump in](https://github.com/gouravrc/solaris-app/blob/main/slr-spring-backend-app/src/main/resources/mock_weather.json)

4. In order to run the application locally, you need to start springboot server first to run the API service in `localhost:8080`, then you `npm run start` the UI application. 

# Prototype Demo

<video width="320" height="240" controls>
  <source src="[movie.mp4](https://www.youtube.com/watch?v=iTWEixN87CE)" type="video/mp4">
  Your browser does not support the video tag.
</video>

<p align="center">
<img alt="PRs Welcome" src="https://forthebadge.com/images/badges/built-with-love.svg" />
</p>
