const http = require('http')
const { join } = require('path')

const CarService = require('./service/carService')
const carCategories = require('./../database/carCategories.json')
const customers = require('./../database/customers.json')

const carsDatabase = join(__dirname, './../database', "cars.json")
const carService = new CarService({ cars: carsDatabase })

const routes = {
    '/rent:post': async (request, response) => {
        for await(const data of request) {
            const dataRequest = JSON.parse(data)
            
            const {
                customerId,
                carCategoryId,
                numberOfDays
            } = dataRequest
            if(
                !dataRequest ||
                !customerId ||
                !carCategoryId ||
                !numberOfDays
            ) {
                response.writeHead(400)
                response.write('Dados incompletos, necessário informar customerId, carCategoryId e numberOfDays!')
                return response.end()
            }
            const customer = customers.find(customer => customer.id === customerId)
            const carCategory = carCategories.find(carCategory => carCategory.id === carCategoryId)
            const transaction = await carService.rent(customer, carCategory, numberOfDays)

            response.writeHead(200)
            response.write(JSON.stringify(transaction))
            return response.end()
        }
    },
    default: (request, response) => {
        response.writeHead(404)
        response.write('Rota não encontrada!')
        return response.end()
    }
}

const handler = (request, response) => {
    const { url, method } = request
    const routeKey = `${url}:${method.toLowerCase()}`
    const chosen = routes[routeKey] || routes.default
    response.writeHead(200, {
        'Content-Type': 'application/json'
    })
    return chosen(request, response)
}

const app = http.createServer(handler)
                .listen(3000, () => console.log(`app running at 3000`))

module.exports = { app, carService}