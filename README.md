# CarCar

Team:

* Person 1 - Which microservice?
* Josh Tobin - Sales microservice

## Project Diagram
![Project Diagram](CarCar-Diagram.png)

## Service microservice

Explain your models and integration with the inventory
microservice, here.

## Sales microservice (PORT:8090)
*The Sales microservice keeps track of automobile sales that comes from the inventory.

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

-After the models were created they were registered in the admin.py file
-A poller was also created as get_sales to poll automobile Vehicle Identification Numbers


| Action | Method | URL |
|---|---|---|
| List salespeople | GET | http://localhost:8090/api/salepeople/
| Create a salespeople | POST | http://localhost:8090/api/salespeople/
| Delete specific salespeople | DELETE | http://localhost:8090/api/salepeople/:id
| List customer | GET | http://localhost:8090/api/customers/
| Create an customer | POST | http://localhost:8090/api/customers/
| Delete an specific customer | DELETE | http://localhost:8090/api/customers/:id
| List sales | GET | http://localhost:8090/api/sales/
| Create a sale  | POST | http://localhost:8090/api/sales/
| Delete a sale  | DELETE | http://localhost:8090/api/sales/:id

-Each endpoint should return a 400 or 404 error if unsuccessful or attempting to access a model object that does not exist.Each endpoint should return a 400 or 404 error if unsuccessful or attempting to access a model object that does not exist.

* Sample GET output for list of salespeople:
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
* Sample POST input and output for salespople:
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
*Sample DELETE output for specific salespeople:
```
{
	"deleted": true
}
```
* Sample GET output for list customers:
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
* Sample POST input and output for customers:
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
* Sample DELETE output for specific customers:
```
{
	"deleted": true
}
```
* Sample GET output for Sales:
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
* Sample POST input and output for Sales:
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
* Sample DELETE output for specific Sales:
```
{
	"deleted": true
}
```
