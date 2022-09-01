const { describe, it, before, beforeEach, afterEach } = require('mocha')
const request = require('supertest')
const { expect } = require('chai')
const sinon = require('sinon');
const { join } = require('path');

const { app, carService} = require('../../src/api')
const Transaction = require('../../src/entities/transaction')

const mocks = {
    validCarCategory: require('../mocks/valid-carCategory.json'),
    validCar: require('../mocks/valid-car.json'),
    validCustomer: require('../mocks/valid-customer.json')
}

describe('API Suite Test', () => {
    let sandbox = {}

    beforeEach(() => {
        sandbox = sinon.createSandbox()
    })

    afterEach(() => {
        sandbox.restore()
    })

    describe('/rent', () => {
        it('should call route /rent and return a transaction object with code status 200', async () => {
            const car = mocks.validCar
            
            sandbox.stub(
                carService,
                carService.getAvailableCar.name
            ).resolves(car)
            
            const customer = mocks.validCustomer
            const carCategory = mocks.validCarCategory
            const numberOfDays = 5
            
            const now = new Date(2022, 08, 1)
            sandbox.useFakeTimers(now.getTime())
            const dueDate = "6 de setembro de 2022"
            
            const finalPrice = carService.calculateFinalPrice(customer, carCategory, numberOfDays)
            sandbox.stub(
                carService,
                carService.calculateFinalPrice.name
            ).returns(finalPrice)

            const result = await request(app)
                                .post('/rent')
                                .send({ customerId: customer.id, carCategoryId: carCategory.id, numberOfDays })
                                .expect(200)

            const expected = new Transaction({
                customer,
                car,
                amount: finalPrice,
                dueDate
            })
            
            expect(result.text).to.be.deep.equal(JSON.stringify(expected))
        })

        it('should call route /rent and return a status code 400 with error message', async () => {
            const result = await request(app)
                                .post('/rent')
                                .send({ customerId: '1', carCategoryId: '2' })
                                .expect(400)
            const msgError = 'Dados incompletos, necessário informar customerId, carCategoryId e numberOfDays!'
            expect(result.text).to.be.equal(msgError)
        })

        it('should call route /re and return a default message', async () => {
            const result = await request(app)
                                .get('/re')
                                .expect(404)
            const msgError = 'Rota não encontrada!'
            expect(result.text).to.be.equal(msgError)
        })
    })
})