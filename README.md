# CarCar

Team #7:

- Dalton Carl - Services Microservice
- Josh Tobin - Sales Microservice

## Getting Started

**Instructions to build and run CarCar**

- Git, Docker, and Node.js 18.16+ are **required** applications. Insomnia is *optional* if wish to test out certain JSON requests..
- Fork and Clone the main repository on your local computer using:
  ```
  git clone <repository.url>
  ```
- Build the project using the following Docker commands:
  ```
  docker volume create beta-data
  docker-compose build
  docker-compose up
  ```
- Ensure Docker containers are running and no exited servers due to errors.
- You can access the project in your browser at: [ http://localhost:3000/ ]
  <br>

## Design

### Project Diagram

![Project Diagram](CarCar-Diagram.png)

This project consists of three microservices.

- Inventory
- Services
- Sales

### Value Objects

Services and sales microservices both rely on automobiles inside the inventory domain. Services use automobiles to determine if a customer is a VIP based on if the VIN matches one in the inventory database. Sales use the value at the sold field for automobiles to either hide or show that automobile on the list of available cars for sale.

### Poller

A poller was created to get information from the inventory domain. The pollers used for both services specifically get automobiles. The poller is set on a timed interval of 60s, at each interval it will update the current database of automobiles for each microservice it is being polled too.

### API Documentation

The following sections show you which URLs you access to get the information from the inventory microservice. Each microservice gives you the ability to create, update, and delete each of the models. Using Insomnia you can hit these URLs to accomplish your intended outcome. Similarly, you can use your browser to view the JSON response. For example, getting the complete list of each model at its given URL.

#### **Manufacturers:**

| Action                         | Request | URL                                         |
| ------------------------------ | -------------- | ------------------------------------------- |
| List manufacturers             | GET            | http://localhost:8100/api/manufacturers/    |
| Create a manufacturer          | POST           | http://localhost:8100/api/manufacturers/    |
| Get a specific manufacturer    | GET            | http://localhost:8100/api/manufacturers/id/ |
| Update a specific manufacturer | PUT            | http://localhost:8100/api/manufacturers/id/ |
| Delete a specific manufacturer | DELETE         | http://localhost:8100/api/manufacturers/id/ |

Creating or updating a manufacturer, requires only the manufacturer's name in the JSON request.

```
{
  "name": "Hyundai"
}
```

Return value for creating, updating, or getting a manufacturer.

```
{
  "href": "/api/manufacturers/1/",
  "id": 1,
  "name": "Hyundai"
}
```

Return a list of manufacturers in a dictionary with a key of "manufacturers”.

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

| Action                       | Request Method | URL                                        |
| ---------------------------- | -------------- | ------------------------------------------ | ------------ |
| List automobiles             | GET            | http://localhost:8100/api/automobiles/     |
| Create an automobile         | POST           | http://localhost:8100/api/                 | automobiles/ |
| Get a specific automobile    | GET            | http://localhost:8100/api/automobiles/vin/ |
| Update a specific automobile | PUT            | http://localhost:8100/api/automobiles/vin/ |
| Delete a specific automobile | DELETE         | http://localhost:8100/api/automobiles/vin/ |

JSON body data for Manufacturers:

_To create an automobile you add the color, year, VIN, and ID of the vehicle model._

```
{
  "color": "red",
  "year": 2012,
  "vin": "1C3CC5FB2AN120174",
  "model_id": 1
}
```

_You can update the color or year of the automobile with a PUT request._

```
{
  "color": "blue",
  "year": 2015
}
```

_You can get information for a specific car with a VIN of "1C3CC5FB2AN120174". The same VIN can be used to delete that car too. The returned body below is from a GET request at this url: http://localhost:8100/api/automobiles/1C3CC5FB2AN120174/_

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

_Return a list of automobiles in a dictionary with a key of "autos"._

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

| Action                          | Request Method | URL                                  |
| ------------------------------- | -------------- | ------------------------------------ |
| List vehicle models             | GET            | http://localhost:8100/api/models/    |
| Create a vehicle model          | POST           | http://localhost:8100/api/models/    |
| Get a specific vehicle model    | GET            | http://localhost:8100/api/models/id/ |
| Update a specific vehicle model | PUT            | http://localhost:8100/api/models/id/ |
| Delete a specific vehicle model | DELETE         | http://localhost:8100/api/models/id/ |

To create a vehicle model you add the name, picture URL, and ID of the manufacturer.

```
{
  "name": "Sebring",
  "picture_url": "imageURL.jpg"
  "manufacturer_id": 1
}
```

You can update the name or picture URL of the vehicle model.

```
{
  "name": "Sebring",
  "picture_url": "imageURL.jpg"
}
```

When updating or creating a vehicle model the body seen below is returned. This same body will be returned viewing a specific vehicle model by going to the ID of that model. The returned body below is from a GET request at this URL: http://localhost:8100/api/models/1/

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

Return a list of automobiles in a dictionary with a key of "models".

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

The service microservice allows for the user to accomplish a number of tasks. It works in relation to the inventory microservice to poll data from there to allow customers to gain a special status if they previously bought their car from us.

### GRUD

#### URLs and Ports

These are both tables of URLs for each microservice. Hitting these endpoints through Insomnia or your browser you can create, view, or delete the information as requested.

**Appointments:**
| Action | Request Method | URL
| ------------ | ------ | ------------- |
| List Appointments | GET | http://localhost:8080/api/appointments/ |
| Create Appointment| POST | http://localhost:8080/api/appointments/
| Get specific Appointment| GET | http://localhost:8080/api/appointments/:id/
| Delete specific Appointment | DELETE | http://localhost:8080/api/appointments/:id
| Cancel Appointment | PUT | http://localhost:8080/api/appointments/:id/cancel
| Finish Appointment | PUT | http://localhost:8080/api/appointments/:id/finish
<br>

**Technicians:**
| Action | Request Method | URL
| ------------ | ------ | ------------- |
| List Technicians | GET | http://localhost:8080/api/technicians/ |
| Create Technician | POST | http://localhost:8080/api/technicians/
| Get specific Technician | GET | http://localhost:8080/api/technicians/id/
| Delete specific Technician | DELETE | http://localhost:8080/api/technicians/:id/
<br>


#### **Appointments JSON Requests/Responses**

**Create Appointment**: To create appointments the following fields shown below are requested. The date time format is not strict as it does not require the full extended format seen below. We ask that the VIN be added upon creation to determine whether the customer is a VIP or not. The status will by default be set to "Created". This POST request creates the appointment, if the technician_id that is entered is not one currently in the list of technicians, you will get an error code of 400, and you are unable to create the appointment. The URL to create an appointment is [http://localhost:8080/api/appointments/]

```
{
  "date_time":"2023-04-20T14:39",
  "reason":"broken glass. everywhere.",
  "vin":"2222",
  "customer":"Warren Longmire",
  "technician_id": 1
}
```

**Specific Appointment**: Adding the ID to the end of the URL with a GET request as such: [http://localhost:8080/api/appointments/:id/] will respond with that specific appointment data.

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

**List Appointments**: A GET request to the URL [http://localhost:8080/api/appointments/] will respond back with a dictionary with the key of "appointments". It shows the full appointment information including the extended information for the technician assigned to that appointment.

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

**Cancel / Finish Appointment**: With a PUT request to the following URL with "cancel" or "finish" at the end will update the appointments status field to the desired value.
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

**Create Technician**: Technicians have three fields when creating them. The employee_id can be a mix of numbers and letters. When a POST request is sent to [http://localhost:8080/api/technicians/] it will respond back with the same information if the status code is 200. It will also display the unique ID given to that technician.

```
{
    "first_name":"Dalton",
    "last_name": "Carl",
    "employee_id": "555JGF2"
}
```

**List Technicians**: A GET request to the URL [http://localhost:8080/api/technicians/] will respond back with a dictionary with the key of "technicians" displaying all of them currently created. Additional will show the unique ID each has. This is useful when creating appointments through Insomnia as it asks for the technician's ID.

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

**Specific Technician**: Adding the ID to the end of the URL with a GET request as such: [http://localhost:8080/api/technicians/:id/] will respond with that specific technician's data.

```
{
  "first_name": "Dalton",
  "last_name": "Carl",
  "employee_id": "555JGF2",
  "id": 2
}
```

**Delete Technician:** If attempting to delete a technician that is currently assigned to a project, you will receive an error as the technician ForeignKey field for appointments is protected. Thus, not allowing you to delete a technician that is part of an appointment. If they are not assigned to an appointment going to the following URL with the technician's ID with a DELETE request will delete the technician. [http://localhost:8080/api/technicians/:id/]

```
{
  "message": "Technician was deleted"
}
```

<br>

### Models

#### **Appointment**

This model has the following fields:

- date_time
- reason
- status
- vin
- customer
- vip
- technician

This model is used to create or view appointments either through Insomnia JSON requests or on front-end web pages. It takes in a ForeignKey from Technician to get the name of available technicians to attach to the appointment. The status will be set to "Created" by default. VIP will be set to true or false depending on if the VIN entered matches one inside of the inventory microservice. If yes, the customer is a VIP and that is shown on the front-end.

#### **Technician**

This model has the following fields:

- first_name
- last_name
- employee_id

This model allows for the creation and viewing of technicians for the project. It does not have any ForeignKeys but is used in the Apartment model. This model is used throughout this microservice to act as a starting point by which appointments are made.

#### **AutomobileVO**

This model has the following fields:
- vin
- sold

This VO model

### Front-End Overview

From the services portion of the application, you can create/view appointments. Service history displays a list of all appointments and their status. You can create/view technicians too which can then be assigned to appointments when they are being created. The intended flow is to first create a technician, then an appointment, then view the list of created appointments to mark them as completed as needed.

#### Appointment Integration

Appointments

#### Technician Integration

 <br>

## Sales microservice

The Sales microservice keeps track of automobile sales that come from the inventory.

Explain your models and integration with the inventory
microservice, here.
Three models were created:

1. Salesperson model
   -Contains these three fields.
   -first_name
   -last_name
   -employee_id

2. Customer model
   -contains these 4 fields.
   -first_name
   -last_name
   -address
   -phone_number

3. Sale model
   -contains these 4 fields.
   -automobile
   -salesperson
   -customer
   -price
   -Automobile, Salesperson, and Customer were all created as foreign keys.

4. AutomobileVO
   -a model containing a vin field.

-After the models were created, they were registered in the admin.py file
-A poller was also created as get_sales to poll automobile Vehicle Identification Numbers

| Action                      | Method | URL                                      |
| --------------------------- | ------ | ---------------------------------------- |
| List salespeople            | GET    | http://localhost:8090/api/salepeople/    |
| Create a salespeople        | POST   | http://localhost:8090/api/salespeople/   |
| Delete specific salespeople | DELETE | http://localhost:8090/api/salepeople/:id |
| List customer               | GET    | http://localhost:8090/api/customers/     |
| Create a customer           | POST   | http://localhost:8090/api/customers/     |
| Delete an specific customer | DELETE | http://localhost:8090/api/customers/:id  |
| List sales                  | GET    | http://localhost:8090/api/sales/         |
| Create a sale               | POST   | http://localhost:8090/api/sales/         |
| Delete a sale               | DELETE | http://localhost:8090/api/sales/:id      |

-Each endpoint should return a 400 or 404 error if unsuccessful or attempting to access a model object that does not exist. Each endpoint should return a 400 or 404 error if unsuccessful or attempting to access a model object that does not exist.

- Sample GET output for a list of salespeople:

```
{
    "salespeople": [
    {
      "first_name": "David",
      "last_name": "Grier",
      "employee_id": "DG4423",
      "id": 6
    },
        ]
}
```

- Sample POST input and output for salespeople:

```
input:
{
  "first_name": "Chris",
  "last_name": "Farley",
  "employee_id": "CF7753"
}

output:
{
  "first_name": "Chris",
  "last_name": "Farley",
  "employee_id": "CF7753",
  "id": 10
}
```

- Sample DELETE output for specific salespeople:

```
{
  "deleted": true
}
```

- Sample GET output for list customers:

```
{
  "customers": [
    {
      "first_name": "Tony",
      "last_name": "Stark",
      "address": "3453 Iron St. Los Angeles, CA",
      "phone_number": 5553248873,
      "id": 7
    }
    ]
}
```

- Sample POST input and output for customers:

```
input:
{
  "first_name": "Tommy",
  "last_name": "Davidson",
  "address": "2532 Salisbury Rd. Los Angeles, CA",
  "phone_number": 4235541254
}

output:
{
  "first_name": "Tommy",
  "last_name": "Davidson",
  "address": "2532 Salisbury Rd. Los Angeles, CA",
  "phone_number": 4235541254,
  "id": 12
}
```

- Sample DELETE output for specific customers:

```
{
  "deleted": true
}
```

- Sample GET output for Sales:

```

{
  "sales": [
    {
      "price": 42334,
      "automobile": {
        "vin": "MDK3453D3453",
        "sold": true
      },
      "customer": {
        "first_name": "Bob",
        "last_name": "Barker",
        "address": "5234 Price BLVD. Los Angeles, CA",
        "phone_number": 5633442236,
        "id": 9
      },
      "salesperson": {
        "first_name": "Lorne",
        "last_name": "Michaels",
        "employee_id": "LM5523",
        "id": 7
      },
      "id": 15
    }
    ]
}

```

- Sample POST input and output for Sales:

```
input:
{
  "automobile": "DJD345G42342DG",
  "salesperson": "7",
  "customer": "10",
  "price": 67347
}

output:
{
  "price": 67347,
  "automobile": {
    "vin": "DJD345G42342DG",
    "sold": true
  },
  "customer": {
    "first_name": "Jim",
    "last_name": "Carey",
    "address": "312 Dumber Ln. Los Angeles, CA",
    "phone_number": 9435529897,
    "id": 10
  },
  "salesperson": {
    "first_name": "Lorne",
    "last_name": "Michaels",
    "employee_id": "LM5523",
    "id": 7
  },
  "id": 19
}
```

- Sample DELETE output for specific Sales:

```
{
  "deleted": true
}
```
