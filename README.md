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

## Project Diagram
![Project Diagram](CarCar-Diagram.png)

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

## Sales microservice

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
* Sample DELETE output for specific Sales:
```
{
	"deleted": true
}
```
