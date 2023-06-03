# Train_MGMT

### About the Project
---
Train Booking Web App using MEAN Stack. 
A simple user input system to book tickets accordingly. Tickets will be booked by the system with user having control over how many tickets to be booked only. If user has previously booked with the same name, those tickets will also be shown accordingly.

### Overview 
---
In this project , the user will be provided numeric and stirng-based inputs for _no of seats_ and _username_ respectively. I've implemented general priority alogirthm for the tickets to be booked in row-based priority and in a cluster.

### Project File Descripiton 
---
#### <img alt="node.js" height="18px" src="https://nodejs.org/static/images/logo.svg">
*  _index.js_ : initalization file for node+mongodb cluster 
*  _routes/routs.js_ : routes + functionality for the api used
* _.env_ : path file for mongodb cluster
* _models/ticketModel.js_ : model for mongodb 

#### <img alt="Angular" height="18px" src="https://angular.io/assets/images/logos/angular/logo-nav@2x.png">
All the angular files are in the client/angular-frontend folder 
* _src/app_ : root file of the angular
* _src/ticket_booking/book_ticket_ : The main files that runs in UI. These files also include the main logic written for the web-app.
* _src/custom-snackbar_ : A custom snackbar created by me to enhance UI. (Still need a bit tweaking.)
* _models/book-ticket-model.ts_ : A mode file created to maintain the scope of the project.

### Local Installation & Setup Instructions :
----
This is file structure of my project: 
```
├──/client/angular-frontend
|   ├── ...
|   └── package.json
└──package.json
```
`npm i` on the root directory and _client/angular-frontend_ directory. 
The project will start at port:8080.  

### Database Strucutre 
---
I have used MongoDb Atlas(free version) for this project.
<img alt="Angular" height="18px" src="https://webimages.mongodb.com/_com_assets/cms/kuyjf3vea2hg34taa-horizontal_default_slate_blue.svg?auto=format%252Ccompress">

```
├──PerosnalCluster
   ├── TRAIN_MGMT
        └── tickets

```
|seatNo|status|category|bookedBy|row|updatedBy    
----|-----|----|---| ---|--|   
|Int32|String|Int32|String|Int32|Date
### Assumptions 
----
1. There are already few seats booked in the train.
2. Mock Json provided to fiddle with.
    * _booking-system-response.ts_ file containcs the mock data. 
    * Refer to the first commented line : 83 in _book-component.ts_ file. 
    * Comment the next line simultaneously to stop the api call and work on mock data.
3. After all tickets are booked a _Clear All Booking_ button is provided to reset all booking in the database.
