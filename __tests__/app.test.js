const app = require('../app.js')
jest.setTimeout(20000)
const supertest = require('supertest')
const request = supertest(app)


it('fetch the records for valid date', async () => {
        let body = {
            "startDate" : "2017-01-26",
            "endDate" : "2018-02-02",
            "minCount" : 20,
            "maxCount" : 3000
        }
    const response = await request.post('/records')
    .send(body)
    expect(response.status).toBe(200)
    expect(response.body.msg).toBe('Success')
    expect(response.body.records).toHaveLength(3)
  })

it('fetch the records for non-existant records date', async () => {
    let body = {
        "startDate" : "2005-01-26",
        "endDate" : "2007-02-02",
        "minCount" : 20,
        "maxCount" : 3000
    }
    const response = await request.post('/records')
    .send(body)
    expect(response.status).toBe(200)
    expect(response.body.msg).toBe('Success')
    expect(response.body.records).toHaveLength(0)
})


it('fetch the records for non-existant records size', async () => {
    let body = {
        "startDate" : "2017-01-26",
        "endDate" : "2018-02-02",
        "minCount" : 2,
        "maxCount" : 3
    }
    const response = await request.post('/records')
    .send(body)
    expect(response.status).toBe(200)
    expect(response.body.msg).toBe('Success')
    expect(response.body.records).toHaveLength(0)
})

it('not passing a required field', async () => {
    let body = {
        "startDate" : "2017-01-26",
        "endDate" : "2018-02-02",
        "minCount" : 2
    }
    const response = await request.post('/records')
    .send(body)
    expect(response.status).toBe(400)
    expect(response.code).toBe(1)
    expect(response.body.msg).toBe('Failure')
})

