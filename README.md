# CarCar

Team #7:

* Dalton Carl - Services Microservice
* Josh Tobin - Sales Microservice

## Getting Started
**Instructions to build and run CarCar**
- Git, Docker, and Node.js are **required** applications. Insomina is *optional*.
- Fork and Clone the main repository on your local computer using:
    ```
    git clone <respository.url>
    ```
- Build the project using the following Docker commands:
     ```
     docker volume create beta-data
    docker-compose build
    docker-compose up
    ```
- Ensure Docker containers are running and no exitied servers due to errors.
- You can access the project in your browser at: [ http://localhost:3000/ ]

## Design

This project consists of three microservices.
- Inventory
- Services
- Sales

### Diagram

![Diagram](images/diagram/)

### Value Objects
Services and sales microservices both rely on the autombiles inside of the inventory domain. Services uses the automobiles to determine if a customer is a VIP based on if the VIN matches one in the inventory database. Sales uses the value at the sold field for automobiles to either hide or show that automobile on the list of available cars for sale.

### Poller
A poller was created to get information from the inventory domain. The pollers used for both services specifically gets the automobiles. The poller is set on a timed interval of 60s, at each internval it will update the the current database of autombiles for each microservice it is being polled to.

### API Documentation
The following sections show you which URLs you access to get the information from the inventory microservice. Each microservice gives yout he ability to create, update, and delete each of the models. Using Insomina you can hit these URLs to accomplish your intented outcome. Similarllu you can use your browser to view the JSON response. For example getting the complete list of each model at its given url.

#### **Manufacturers:**
| Action | Request Method | URL
| ---------- | ------ | ------------- |
| List manufacturers | GET | http://localhost:8100/api/manufacturers/ |
| Create a manufacturer | POST | http://localhost:8100/api/manufacturers/
| Get a specific manufacturer | GET | http://localhost:8100/api/manufacturers/id/
| Update a specific manufacturer | PUT | http://localhost:8100/api/manufacturers/id/
| Delete a specific manufacturer | DELETE | http://localhost:8100/api/manufacturers/id/

*Creating or updating a manufacturer, requires only the manufacturer's name in the JSON request.*
```
{
  "name": "Hyundai"
}
```
*Return value for creating, updating, or getting a manufaturer.*
```
{
	"href": "/api/manufacturers/1/",
	"id": 1,
	"name": "Hyundai"
}
```
*Return a list of manufacturers in a dictionary with a key of "manufacturers".*
```
{
  "manufacturers": [
    {
      "href": "/api/manufacturers/1/",
      "id": 1,
      "name": "Hyundai"
    }
  ]
}
```

#### **Automobiles**
| Action | Request Method | URL
| -------- | -------- | ------------- |
| List automobiles | GET | http://localhost:8100/api/automobiles/ |
| Create an automobile | POST | http://localhost:8100/api/ |automobiles/
| Get a specific automobile | GET | http://localhost:8100/api/automobiles/vin/
| Update a specific automobile | PUT | http://localhost:8100/api/automobiles/vin/
| Delete a specific automobile | DELETE | http://localhost:8100/api/automobiles/vin/

JSON body data for Manufacturers:

*To create an automobile you add the color, year, VIN, and the ID of the vehicle model.*
```
{
  "color": "red",
  "year": 2012,
  "vin": "1C3CC5FB2AN120174",
  "model_id": 1
}
```
*You can update the color or year of the automobile with a PUT request.*
```
{
  "color": "blue",
  "year": 2015
}
```
*You can get information for a specific car with a VIN of "1C3CC5FB2AN120174". The same VIN can be used to delete that car too. The returned body below is from a GET request at this url: http://localhost:8100/api/automobiles/1C3CC5FB2AN120174/*
```
{
	"href": "/api/automobiles/1C3CC5FB2AN120174/",
	"id": 1,
	"color": "blue",
	"year": 2015,
	"vin": "777",
	"model": {
		"href": "/api/models/1/",
		"id": 1,
		"name": "R8",
		"picture_url": "imageURL.jpg",
		"manufacturer": {
			"href": "/api/manufacturers/1/",
			"id": 1,
			"name": "Audi"
		}
	}
}
```

*Return a list of automobiles in a dictionary with a key of "autos".*
```
{
  "autos": [
    {
      "href": "/api/automobiles/1C3CC5FB2AN120174/",
      "id": 1,
      "color": "pink",
      "year": 2015,
      "vin": "1C3CC5FB2AN120174",
      "model": {
        "href": "/api/models/1/",
        "id": 1,
        "name": "Sebring",
        "picture_url": "imageURL.jpg",
        "manufacturer": {
          "href": "/api/manufacturers/1/",
          "id": 1,
          "name": "Ford"
        }
      },
      "sold": true
    }
  ]
}
```

#### **Vehicle Models**
| Action | Request Method | URL
| --------- | -------- | --------- |
| List vehicle models | GET | http://localhost:8100/api/models/
| Create a vehicle model | POST | http://localhost:8100/api/models/
| Get a specific vehicle model | GET | http://localhost:8100/api/models/id/
| Update a specific vehicle model | PUT | http://localhost:8100/api/models/id/
| Delete a specific vehicle model | DELETE | http://localhost:8100/api/models/id/


*To create a vehicle modele you add the name, picture url, and ID of the manufacturer.*
```
{
  "name": "Sebring",
  "picture_url": "imageURL.jpg"
  "manufacturer_id": 1
}
```

*You can update the name or picture url of the vehicle model.*
```
{
  "name": "Sebring",
  "picture_url": "imageURL.jpg"
}
```
*When updating or creating a vehicle model the body seen below is returned. This same body will be returned viewing a spcfiic vehicle model by going to ID of that model. The returned body below is from a GET request at this url: http://localhost:8100/api/models/1/*
```
{
  "href": "/api/models/1/",
  "id": 1,
  "name": "Sebring",
  "picture_url": "imageURL.jpg",
  "manufacturer": {
    "href": "/api/manufacturers/1/",
    "id": 1,
    "name": "Hyundai"
  }
}
```
*Return a list of automobiles in a dictionary with a key of "models".*
```
{
  "models": [
    {
      "href": "/api/models/1/",
      "id": 1,
      "name": "Sebring",
      "picture_url": "imageURL.jpg",
      "manufacturer": {
        "href": "/api/manufacturers/1/",
        "id": 1,
        "name": "Hyundai"
      }
    }
  ]
}
```
<br>

## Service Microservice

Explain your models and integration with the inventory
microservice, here.

### URLs and Ports
These are both tables of URLs for each microservice. Hitting these endpoints through Insomina or your browser you can create, view, or delete the information as requested.

**Apointments:**
| Action | Request Method | URL
| ------------ | ------ | ------------- |
| List Appointments | GET | http://localhost:8080/api/appointments/ |
| Create a Appointment| POST | http://localhost:8080/api/appointments/
| Get a specific Appointment| GET | http://localhost:8080/api/appointments/:id/
| Delete a specific Appointment | DELETE | http://localhost:8080/api/appointments/:id
| Cancel an Appointment | PUT | http://localhost:8080/api/appointments/:id/cancel
| Finish an Appointment | PUT | http://localhost:8080/api/appointments/:id/finish
<br>

**Technicians:**
| Action | Request Method | URL
| ------------ | ------ | ------------- |
| List Technicians | GET | http://localhost:8080/api/technicians/ |
| Create a Technician | POST | http://localhost:8080/api/technicians/
| Get a specific Technician | GET | http://localhost:8080/api/technicians/id/
| Delete a specific Technician | DELETE | http://localhost:8080/api/technicians/:id/
<br>

### GRUD

#### **Appointments JSON Requests/Responses**

**Create Appointment**: To create appointments the following fields shown below are requested. The date time format is not strict as it does not require the full extended format seen below. We ask that the VIN be added upon creation to determine whether the customer is a VIP or not. The status will by default be set to "Created". This POST request creates the appointment, if the technician_id that is entered is not one currently in the list of technicians, you will get an error code of 400, and that you are unable to create the appointment. The URL to create an appointment is [http://localhost:8080/api/appointments/]
```
{
	"date_time":"2023-04-20T14:39",
  "reason":"broken glass. everywhere.",
  "vin":"2222",
  "customer":"Warren Longmire",
  "technician_id": 1
}
```

**Specfic Appointment**: Adding the ID to end of the url with a GET request as such: [http://localhost:8080/api/appointments/:id/] will response with that specfici appointments data.
```
{
  "date_time": "2023-04-20T14:39:00+00:00",
	"reason": "broken glass. everywhere.",
	"status": "Created",
	"vin": "2222GFFEFF32",
	"customer": "Warren Longmire",
	"vip": false,
	"id": 3,
	"technician": {
		"first_name": "Dalton",
		"last_name": "Carl",
		"employee_id": "555JGF2",
		"id": 1
			}
```

**List Appointments**: A GET request to the url [http://localhost:8080/api/appointments/] will response back with a dictionary with the key of "appointments". It shows the full appointment information including the extended information for the technician assigned to that appointment.
```
{
    "appointments": [
		{
		"date_time": "2023-06-06T16:10:00+00:00",
		"reason": "Broken Axel",
		"status": "Created",
		"vin": "23FFDS3232",
		"customer": "Matt Batt",
		"vip": false,
		"id": 2,
		"technician": {
			"first_name": "Dalton,
			"last_name": "Carl",
			"employee_id": "555JGF2",
			"id": 1
			}
		},
```
**Cancel / Finish Appointment**: With a PUT request to following URL with "cancel" or "finish" at the end will update the apppointments status field to the desired value.
[http://localhost:8080/api/appointments/:id/cancel]

```
{
	"message": "Appointment marked as canceled"
}
```
[http://localhost:8080/api/appointments/:id/finish]
```
{
	"message": "Appointment marked as finished"
}
```
<br>

#### **Technicians JSON Requests/Responses**

**Create Technician**: Technicians have three fields when creating them. The employee_id can be a mix of numbers and letters. When a POST request is sent to [http://localhost:8080/api/technicians/] it will response back with the same information if the status code is 200. It will also display the unuiqe ID given to that technician.
```
{
    "first_name":"Dalton",
    "last_name": "Carl",
    "employee_id": "555JGF2"
}
```

**List Technicians**: A GET request to the url [http://localhost:8080/api/technicians/] will response back with a dictionary with the key of "technicians" displaying all of them currently created. Additional will show the unquie ID each has. This is useful when creating appointments through Insomina as it asks for the technicians ID.
```
{
	"technicians": [
		{
		"first_name": "Sam",
		"last_name": "Bam",
		"employee_id": "123123G",
		"id": 1
		},
		{
		"first_name": "Dalton",
		"last_name": "Carl",
		"employee_id": "555JGF2",
		"id": 2
		}
	]
}
```
**Specfic Technician**: Adding the ID to end of the url with a GET request as such: [http://localhost:8080/api/technicians/:id/] will response with that specfici technicians data.
```
{
	"first_name": "Dalton",
	"last_name": "Carl",
	"employee_id": "555JGF2",
	"id": 2
}
```

**Delete Technician:** If attempting to delete a technician that is currently assigned to a project, you will receive an error as the technican ForiegnKey field for appointments is protected. Thus not allowing you delete a techncian that is apart of an appointment. If they are not assigned to a appointment going to the following URL with the technicians ID with a DELETE request will delete the technician. [http://localhost:8080/api/technicians/:id/]
```
{
	"message": "Technician was deleted"
}
```
<br>

### Models

#### Appointment
The appointment model allows for the creation of appointments accepting the following fields:
*date_time, customer, VIP, status, technician, VIN*
It takes in a ForeignKey from Techncian to get the name of avaiable technicians to attach to the appointment.


#### Technician
The technician model acts

#### AutomobileVO
This VO model


### Front-End Overview
From the services portion of the application you can create/view appointments. Service history displays a list of all appointments and their current status. You can create/view technicians too which can then be assigned to appointments when they are being created. The intented flow is to first create a technician, then appointment, then view the list of created appointments to mark them as compelted as needed.

#### Appointment Intergration
Appointments


#### Technician Intergration







----------
## Sales microservice

Explain your models and integration with the inventory
microservice, here.
