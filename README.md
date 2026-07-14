# Web application that supports children in learning Polish language syntax.

A web application supporting children in learning Polish grammar and spelling, with gamification and competition elements between users.
Three user roles are available: student, teacher, and admin - each with a dedicated set of features.

## Stack
Java ~ Spring Boot ~ Hibernate ~ PostgreSQL ~ React ~ Docker

## Getting started with launching the app

1. Install JDK 23 from the internet.
2. Install Docker Desktop.
3. Install Node.js.
4. Clone this repository.

### Lauching backend

1. Open up *backend* folder in Command Prompt or PowerShell.
2. Run Docker Desktop
3. Run command "docker compose up -d" - this download image of used database version in project. Wait for the information, that docker container has been created.
4. Run command "mvnw.cmd spring-boot:run" in CMD or " .\mvnw.cmd spring-boot:run" in PowerShell.
5. If everything goes properly, there will be no problems, what means backend is now running. Keep the terminal open.

### Launchig frontend

1. Open up *frontend* folder in Command Prompt or PowerShell.
2. Run command "npm install" - this download all of the packages required to run the app.
3. Run "npm run dev".
4. Open given link in the browser.

## User roles

### Guest

<p>Homepage - new users can create an account or log in, if already registered:</p>
<img width="997" height="892" alt="image" src="https://github.com/user-attachments/assets/f3dacdcd-2147-4b63-a5d7-f2017981c497" />

<p align="center">Register page:<br>
<img width="450" height="687" alt="register" src="https://github.com/user-attachments/assets/4576d9a8-93ea-4553-b059-dfdec0813762" />
</p>
<p align="center">Log in page:<br>
<img width="450" height="576" alt="login" src="https://github.com/user-attachments/assets/65ca33c8-3e31-4d17-b7a2-02095bec70e5" />
</p>
Having an account on the platform is not necessary to start learning, but progress is not tracked.
Here are two screenshots showing different task types.

<p align="center">
<img width="793" height="848" alt="sentencepreview" src="https://github.com/user-attachments/assets/220449d1-4c9d-48be-afaf-af7ec6cdfeb5" />
<img width="770" height="840" alt="quizpreview" src="https://github.com/user-attachments/assets/082f8211-82c1-482e-b056-e0f39deec829" />
</p>

### Student

Student role  includes several additional features. Tasks are tracked and it is easily visible which tasks are completed or not. There is an algorithm implemented on the platforms, that calculates the user's accuracy rate for each task, displayed as awarded stars.
<p align="center">
<img width="773" height="765" alt="userstaskstars" src="https://github.com/user-attachments/assets/b916fc8a-8515-444f-bb82-df5644b45763" />
</p>

Example of solving quiz:
<p align="center">
<img width="1011" height="649" alt="quiz solver" src="https://github.com/user-attachments/assets/bb430621-4ae5-4001-b266-72838b697ebb" />
</p>

Example of solving sentence completion. In this type of tasks ther is always a explanation. 
<p align="center">
<img width="521" height="469" alt="explenation" src="https://github.com/user-attachments/assets/1e6de7d1-65b3-40b6-bc3d-0eadf4d7f7ce" />
</p>

Students earn stars and points by solving tasks. All progress, including stars, points and achievements, is visible on the profile page. Achievements are awarded for meeting specific goals within the platform
<p align="center">
<img width="658" height="700" alt="stats" src="https://github.com/user-attachments/assets/9edc7a57-61d2-4ece-aadb-c50efafba879" />
</p>

### Teacher

### Admin


