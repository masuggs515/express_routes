process.env.NODE_ENV = "test";

const request = require('supertest');
const app = require('./app');
let items = require('./fakeDb');

let chocolate = {"name": "chocolate", "price": 2};

beforeEach(()=>{
    items.push(chocolate);
});

afterEach(()=>{
    items.length = 0;
});

describe("GET /items", ()=>{
    test("Get a list of all items", async ()=>{
        const response = await request(app).get('/items');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({items: [chocolate]});
    });
});

describe("POST /items", ()=>{
    test("Post a new item to list", async ()=>{
        const response = await request(app).post('/items')
        .send({"name": "banana", "price": 1.49});

        expect(response.statusCode).toBe(201);
        expect(response.body).toEqual({"added": {"name": "banana", "price": 1.49}});
    });
});

describe("GET /items/:name", ()=>{
    test("Show single item", async ()=>{
        const response = await request(app).get('/items/chocolate');

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({"name": "chocolate", "price": 2});
    });
    test("Returns 404 if item name is invalid", async ()=>{
        const response = await request(app).get('/items/apple');
        expect(response.statusCode).toBe(404)
    });
});

describe("PATCH /items/:name", ()=>{
    test("Edit item name and price", async ()=>{
        const response = await request(app).patch('/items/chocolate')
        .send({"name": "banana", "price": 1.49});

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({"updated": {"name": "banana", "price": 1.49}});
    });
    test("Returns 404 if item name is invalid", async ()=>{
        const response = await request(app).patch('/items/apple');
        expect(response.statusCode).toBe(404)
    });
});

describe("DELETE /items/:name", ()=>{
    test("Delete item from list", async ()=>{
        const response = await request(app).delete('/items/chocolate');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({message: "Deleted"});
    });
    test("Returns 404 if item name is invalid", async ()=>{
        const response = await request(app).patch('/items/apple');
        expect(response.statusCode).toBe(404)
    });
})