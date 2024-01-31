process.env.NODE_ENV = "test" 

const db = require("../db");
const app = require("../app");
const express = require("express")
const router = new express.Router()
const Book = require("../models/book");
const ExpressError = require("../expressError");

const request = require("supertest");

beforeEach(async function () {
    await db.query("DELETE FROM books");


    let b1 = await Book.create(
        {
            "isbn": "0691161518",
            "amazon_url": "http://a.co/eobPtX2",
            "author": "Sarah J Mass",
            "language": "english",
            "pages": 500,
            "publisher": "Princeton University Press",
            "title": "Trone of Glass",
            "year": 2017
          }
          
     )});



describe("GET /books", function(){
    test("get all books", async function(){
        const result = await Book.findAll()
        expect(result).toEqual([{
            "isbn": "0691161518",
            "amazon_url": "http://a.co/eobPtX2",
            "author": "Sarah J Mass",
            "language": "english",
            "pages": 500,
            "publisher": "Princeton University Press",
            "title": "Trone of Glass",
            "year": 2017
          }])
    })
})

describe("GET /:isbn" ,function(){
    test("get isbn details", async function(){
        const result = await Book.findOne("0691161518")
        expect(result).toEqual({
            "isbn": "0691161518",
            "amazon_url": "http://a.co/eobPtX2",
            "author": "Sarah J Mass",
            "language": "english",
            "pages": 500,
            "publisher": "Princeton University Press",
            "title": "Trone of Glass",
            "year": 2017
          })
    })
})

describe("POST /books", function(){
    test("creating book details", async function(){
        const result = await Book.create({
            "isbn": "0691161519",
            "amazon_url": "http://a.co/eobPtX2",
            "author": "Sarah J Mass",
            "language": "english",
            "pages": 700,
            "publisher": "Princeton University Press",
            "title": "House of Flame and Shadow",
            "year": 2017
          })
        expect(result).toEqual({
            "isbn": "0691161519",
            "amazon_url": "http://a.co/eobPtX2",
            "author": "Sarah J Mass",
            "language": "english",
            "pages": 700,
            "publisher": "Princeton University Press",
            "title": "House of Flame and Shadow",
            "year": 2017
          })
    })
})
describe("update /books/:isbn", function(){
    test("update details at isbn", async function(){
        const result = await Book.update("0691161518",{
            "isbn": "0691161518",
            "amazon_url": "http://a.co/eobPtX2",
            "author": "Sarah J Mass",
            "language": "english",
            "pages": 700,
            "publisher": "Princeton University Press",
            "title": "Crescent City: House of Flame and Shadow",
            "year": 2017
          } )
          expect(result).toEqual({
            "isbn": "0691161518",
            "amazon_url": "http://a.co/eobPtX2",
            "author": "Sarah J Mass",
            "language": "english",
            "pages": 700,
            "publisher": "Princeton University Press",
            "title": "Crescent City: House of Flame and Shadow",
            "year": 2017
          })
    })
})
describe("DELETE /books/:isbn", function(){
    test("delete with isbn", async function(){
        const response = await request(app).delete(`/books/0691161518`)
        expect(response.body).toEqual({message:"Book deleted"})
    })
});

afterAll(async function() {
await db.end();
});