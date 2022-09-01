curl -X POST localhost:3000/rent \
    -d '{"customerId": "7afd245c-ac4f-4816-9dea-94aa16fe8bc3", "carCategoryId": "a27776b0-37c0-4f34-8102-e1ce0de9f8b5", "numberOfDays": 5}' \
    -H "Content-Type: application/json"

curl -X POST localhost:3000/rent \
    -d '{"customer": {"id": "7afd245c-ac4f-4816-9dea-94aa16fe8bc3", "name": "Darren VonRueden V", "age": 20}, 
        "carCategory": {
        "id": "a27776b0-37c0-4f34-8102-e1ce0de9f8b5",
        "name": "Minivan",
        "carIds": [
            "1817502a-5cf5-4031-8b9f-81614d8bdf7e",
            "f2d82ddc-854c-4c64-941f-9c92d3dfe70b",
            "02b388d4-e8ac-4f68-abc6-fb401873571c"
        ],
        "price": 49.96}, 
        "numberOfDays": 5}' \
    -H "Content-Type: application/json"