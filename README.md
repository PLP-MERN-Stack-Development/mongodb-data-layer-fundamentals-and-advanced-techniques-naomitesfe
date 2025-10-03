# MongoDB Data Layer Fundamentals - Week 1

This project contains the Week 1 assignment for **Full stack web development MERN Stack**.  
It demonstrates creating a MongoDB database, performing CRUD operations, running queries, using aggregation pipelines, and implementing indexes for performance.

## Project Structure

- `insert_books.js` - Script to populate the `plp_bookstore` database with sample books.
- `queries.js` - Script containing MongoDB queries for CRUD, sorting, pagination, and aggregation.
- `README.md` - Project instructions and setup guide.

## Requirements

- Node.js v18 or higher
- MongoDB Community Edition (local) or MongoDB Atlas account
- MongoDB Shell (`mongosh`) or MongoDB Compass

## Setup Instructions

1. **Clone the repository** (already done if using GitHub Classroom):
   ```bash
   git clone <your-repo-url>
   cd <project-folder>

## Install dependencies:

``` bash
npm install
Run the insert_books.js script to populate the database:
``` 

``` bash
node insert_books.js
``` 
This will insert 12 sample books into the plp_bookstore database in the books collection.

- Run the queries.js script to perform CRUD operations, sorting, pagination, and aggregation:

``` bash
node queries.js
``` 
# MongoDB Queries Examples
- Find all books in a genre
- Find books published after a certain year
- Update price of a book
- Delete a book
- Sorting by price (ascending/descending)
- Pagination using limit and skip
- Aggregation examples:
- Average price by genre
- Author with most books
- Books grouped by decade

All queries are included in queries.js and can be tested using mongosh or MongoDB Compass.

## How to Test in Compass / mongosh
- Open MongoDB Compass or connect with mongosh.
- Connect using:
``` bash
mongodb://localhost:27017/
``` 
- Use the database:

``` bash
use plp_bookstore
``` 
- Test queries like:

``` bash
db.books.find({ genre: "Fiction" })
db.books.find({ price: { $gt: 10 } }).sort({ price: 1 })
db.books.aggregate([{ $group: { _id: "$genre", avgPrice: { $avg: "$price" } } }])
``` 