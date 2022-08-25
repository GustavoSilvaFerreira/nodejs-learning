const { describe, it } = require('mocha')
const request = require('supertest')
const assert = require('assert')

const app = require('./api')

describe('API Suite test', () => {
    describe('/contacts', () => {
        it('Should request the contact page and return HTTP Status 200', async() => {
            const response = await request(app)
                                .get('/contact')
                                .expect(200)
            assert.deepStrictEqual(response.text, 'contact us page')
        })
    })

    describe('/hello', () => {
        it('Should request an inexistent router /hi and  redirect to /hello', async() => {
            const response = await request(app)
                                .get('/hi')
                                .expect(200)
            assert.deepStrictEqual(response.text, 'Hello World!')
        })
    })
})