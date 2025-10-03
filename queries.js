// MongoDB queries for Week 1 Assignment
const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const dbName = 'plp_bookstore';
const collectionName = 'books';

async function runQueries() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB server');
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Task 2: Basic CRUD Operations
    // 1. Find all books in a specific genre
    const fictionBooks = await collection.find({ genre: 'Fiction' }).toArray();
    console.log('\nFiction Books:', fictionBooks);

    // 2. Find books published after a certain year (e.g., 1950)
    const recentBooks = await collection.find({ published_year: { $gt: 1950 } }).toArray();
    console.log('\nBooks published after 1950:', recentBooks);

    // 3. Find books by a specific author
    const orwellBooks = await collection.find({ author: 'George Orwell' }).toArray();
    console.log('\nBooks by George Orwell:', orwellBooks);

    // 4. Update the price of a specific book
    await collection.updateOne(
      { title: '1984' },
      { $set: { price: 11.99 } }
    );
    console.log('\nUpdated price of "1984"');

    // 5. Delete a book by its title
    await collection.deleteOne({ title: 'Moby Dick' });
    console.log('\nDeleted "Moby Dick" from collection');

    // Task 3: Advanced Queries

    // 6. Find books that are both in stock and published after 2010
    const inStockRecent = await collection.find({
      in_stock: true,
      published_year: { $gt: 2010 }
    }).toArray();
    console.log('\nIn-stock books published after 2010:', inStockRecent);

    // 7. Projection - return only title, author, price
    const projectedBooks = await collection.find({}, { projection: { title: 1, author: 1, price: 1, _id: 0 } }).toArray();
    console.log('\nBooks with selected fields:', projectedBooks);

    // 8. Sorting by price ascending
    const sortedAsc = await collection.find({}).sort({ price: 1 }).toArray();
    console.log('\nBooks sorted by price ascending:', sortedAsc);

    // 9. Sorting by price descending
    const sortedDesc = await collection.find({}).sort({ price: -1 }).toArray();
    console.log('\nBooks sorted by price descending:', sortedDesc);

    // 10. Pagination (limit 5, skip first 5)
    const paginatedBooks = await collection.find({}).skip(5).limit(5).toArray();
    console.log('\nPaginated books (page 2, 5 per page):', paginatedBooks);

    // Task 4: Aggregation Pipeline
    // 11. Average price of books by genre
    const avgPriceByGenre = await collection.aggregate([
      { $group: { _id: '$genre', avgPrice: { $avg: '$price' } } }
    ]).toArray();
    console.log('\nAverage price by genre:', avgPriceByGenre);

    // 12. Author with most books
    const topAuthor = await collection.aggregate([
      { $group: { _id: '$author', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 1 }
    ]).toArray();
    console.log('\nAuthor with most books:', topAuthor);

    // 13. Group books by publication decade
    const booksByDecade = await collection.aggregate([
      {
        $group: {
          _id: { $multiply: [{ $floor: { $divide: ['$published_year', 10] } }, 10] },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]).toArray();
    console.log('\nBooks grouped by decade:', booksByDecade);

    // Task 5: Indexing
    // 14. Index on title
    await collection.createIndex({ title: 1 });
    console.log('\nCreated index on title');

    // 15. Compound index on author and published_year
    await collection.createIndex({ author: 1, published_year: -1 });
    console.log('Created compound index on author and published_year');

    // 16. Explain() to show index usage
    const explainResult = await collection.find({ title: '1984' }).explain('executionStats');
    console.log('\nExplain result for title search:', explainResult.executionStats);

  } catch (err) {
    console.error('Error:', err);
  } finally {
    await client.close();
    console.log('Connection closed');
  }
}

// Run all queries
runQueries().catch(console.error);
