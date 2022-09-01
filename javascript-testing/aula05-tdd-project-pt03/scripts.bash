curl -X POST localhost:3000/rent \
    -d '{"customerId": "7afd245c-ac4f-4816-9dea-94aa16fe8bc3", "carCategoryId": "a27776b0-37c0-4f34-8102-e1ce0de9f8b5", "numberOfDays": 5}' \
    -H "Content-Type: application/json"