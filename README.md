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
<img width="1810" height="805" alt="image" src="https://github.com/user-attachments/assets/90be1987-2fd8-4c83-8126-c81acb14be60" />
</p>

Example of solving sentence completion. In this type of tasks ther is always a explanation. 
<p align="center">
<img width="521" height="469" alt="explenation" src="https://github.com/user-attachments/assets/1e6de7d1-65b3-40b6-bc3d-0eadf4d7f7ce" />
</p>

After finishing the task, students get feedback about the score and earned stars and points.
<p align="center">
<img width="1813" height="779" alt="image" src="https://github.com/user-attachments/assets/aac369c5-e41a-4dbf-8962-495cafcbd127" />
</p>

Students earn stars and points by solving tasks. All progress, including stars, points and achievements, is visible on the profile page. Achievements are awarded for meeting specific goals within the platform
<p align="center">
<img width="1354" height="944" alt="image" src="https://github.com/user-attachments/assets/312f27a8-b7d9-4a09-a5a3-c00b1b55ded6" />
</p>

Application include a sollution for connecting teachers with their students. Students can join to 'virtual classes', created by teachers, by entering a specific unique code generated for each class.
<p align="center">
<img width="1378" height="899" alt="image" src="https://github.com/user-attachments/assets/779c0e47-c849-4f30-add7-7d0c1bee9819" />
</p>

Platform track a global ranking. There is a separate subpage, where students can see their level, points and where they rank in the ranking. Global ranking show the best ten users, although if student's rank is for example 56, it is visible for them below ranking table.
<p align="center">
<img width="1388" height="946" alt="image" src="https://github.com/user-attachments/assets/8425ad07-2173-4a53-8f2a-80671d689704" />
</p>

### Teacher

Teachers can view tasks and solve them, but theirs scores are not taking into account in rankings. The main purpose of that role is that, they can create virtual classes and create new tasks on the platform.

Creating new virtual class:
<p align="center">
<img width="1481" height="942" alt="image" src="https://github.com/user-attachments/assets/5c0d9114-ea83-400c-a782-31c5f3575f45" />
</p>

Another feature allows teachers to review the scores of students who have joined their virtual class. Teachers can also filter the results by task type and date.
<p align="center">
<img width="1349" height="948" alt="image" src="https://github.com/user-attachments/assets/8e208188-33c9-45b0-bcef-454dba1c202e" />
</p>

Teachers are allowed to create tasks by prepared form. They have to fill out the form and type questions and answers. Then aadmin of the platform need to accept this task to be visible and able to solve for everybody.
<p align="center">
<img width="1061" height="953" alt="image" src="https://github.com/user-attachments/assets/a03d29c8-b7a7-42d1-844a-cae00b050fa4" />
</p>

### Admin

This role has two main functions: moderating the visibility of tasks on the platform and approving or rejecting tasks created by teachers. Additionally, admins can create tasks that are automatically visible to users by filling out the same form available to teachers.

Moderating the visuability of the tasks - here they can hide and show tasks for everybody:
<p align="center">
<img width="1300" height="957" alt="image" src="https://github.com/user-attachments/assets/b25c03f1-69ea-4caf-b0b8-4acc1044f056" />
</p>

Accepting or rejecting tasks - here they can review created task and decide about them:
<p align="center">
<img width="1333" height="953" alt="image" src="https://github.com/user-attachments/assets/6f4c451f-341d-45eb-982a-09939d076e24" />
</p>


