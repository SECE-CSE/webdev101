# MongoDB cheatsheet 
This cheatsheet provides a quick reference to some of the most commonly used commands and features in MongoDB.

### MongoDB Supported Data Types

| Type                  | Description                                             | Example                                    |
|-----------------------|---------------------------------------------------------|--------------------------------------------|
| **String**            | Text data (UTF-8 encoded)                                | `{ name: "John Doe" }`                     |
| **Integer**           | Whole numbers                                           | `{ age: 25 }`                              |
| **Double**            | Floating point numbers                                  | `{ price: 99.99 }`                         |
| **Boolean**           | True/False values                                       | `{ isActive: true }`                       |
| **Date**              | ISO date/time                                           | `{ createdAt: new Date() }`                |
| **ObjectId**          | Unique identifier                                       | `{ _id: ObjectId("60c72b2f5f1b2c6a56a73f1c") }` |
| **Array**             | List of values                                          | `{ tags: ["tag1", "tag2", "tag3"] }`       |
| **Document**          | Nested document                                         | `{ address: { city: "New York", zip: "10001" } }` |
| **Binary Data**       | Data stored as binary                                    | `{ data: BinData(0, "abcd1234") }`         |
| **Object**            | Alias for Document type                                 | `{ details: { height: 180, weight: 75 } }` |
| **Regular Expression**| Pattern matching                                        | `{ name: /John/ }`                         |
| **Timestamp**         | Specific timestamp data type                            | `{ lastUpdated: Timestamp(1622911234, 1) }`|
| **Decimal128**        | High-precision decimal                                   | `{ balance: Decimal128("123456789.012345") }` |
| **Min/Max Key**       | Min/Max value for comparisons                            | `{ minKey: MinKey(), maxKey: MaxKey() }`   |
| **Code**              | JavaScript code                                         | `{ func: Code("function() { return true; }") }` |
| **Code with Scope**   | JavaScript code with associated scope                    | `{ func: Code("function() { return this.x; }", { x: 5 }) }` |
| **Symbol**            | Special string type for internal use                     | `{ sym: Symbol("mySymbol") }`              |

Here's an example demonstrating how to use some of the types:

```javascript
db.myCollection.insertOne({
  name: "John Doe",
  age: 30,
  price: 99.99,
  isActive: true,
  createdAt: new Date(),
  address: {
    city: "New York",
    zip: "10001"
  },
  tags: ["tag1", "tag2", "tag3"],
  data: BinData(0, "abcd1234"),
  balance: Decimal128("123456789.012345"),
  lastUpdated: Timestamp(1622911234, 1),
  minKey: MinKey(),
  maxKey: MaxKey(),
  func: Code("function() { return true; }")
});
```

You can use these types when inserting, updating, or querying data in MongoDB collections. 

### MongoDB Operators and Query Modifiers

| Operation                 | Command Example                                        |
|---------------------------|--------------------------------------------------------|
| **Connect to MongoDB**    |                                                        |
| Connect to a local DB     | `mongo`                                                 |
| Connect to a specific DB  | `mongo myDatabase`                                      |
| **Database Operations**   |                                                        |
| Show databases            | `show dbs`                                              |
| Create/use a database     | `use myDatabase`                                        |
| Drop a database           | `db.dropDatabase()`                                     |
| **Collection Operations** |                                                        |
| Show collections          | `show collections`                                     |
| Create a collection       | `db.createCollection('myCollection')`                   |
| Drop a collection         | `db.myCollection.drop()`                                |
| **Document Operations**   |                                                        |
| Insert a document         | `db.myCollection.insertOne({ name: 'John', age: 30 })`  |
| Insert multiple documents | `db.myCollection.insertMany([{ name: 'Jane', age: 25 }, { name: 'Mike', age: 35 }])` |
| Find one document         | `db.myCollection.findOne({ name: 'John' })`             |
| Find all documents        | `db.myCollection.find()`                               |
| Update a document         | `db.myCollection.updateOne({ name: 'John' }, { $set: { age: 31 } })` |
| Update multiple docs      | `db.myCollection.updateMany({ age: { $lt: 35 } }, { $set: { adult: true } })` |
| Delete a document         | `db.myCollection.deleteOne({ name: 'John' })`           |
| Delete multiple docs      | `db.myCollection.deleteMany({ age: { $gt: 30 } })`      |
| **Query Operations**      |                                                        |
| Find with condition       | `db.myCollection.find({ age: { $gte: 25 } })`           |
| Find with projection      | `db.myCollection.find({}, { name: 1, _id: 0 })`         |
| Find with sorting         | `db.myCollection.find().sort({ age: -1 })`              |
| Find with limit           | `db.myCollection.find().limit(5)`                      |
| Find with skip            | `db.myCollection.find().skip(2)`                       |
| **Indexing**              |                                                        |
| Create an index           | `db.myCollection.createIndex({ name: 1 })`              |
| Show indexes              | `db.myCollection.getIndexes()`                         |
| Drop an index             | `db.myCollection.dropIndex({ name: 1 })`                |
| **Aggregation**           |                                                        |
| Basic aggregation         | `db.myCollection.aggregate([{ $match: { age: { $gt: 30 } } }])` |
| Grouping                  | `db.myCollection.aggregate([{ $group: { _id: '$age', count: { $sum: 1 } } }])` |
| **Backup and Restore**    |                                                        |
| Backup a database         | `mongodump --db myDatabase --out backup/`               |
| Restore a database        | `mongorestore backup/myDatabase/`                       |
| **Miscellaneous**         |                                                        |
| Count documents           | `db.myCollection.countDocuments()`                      |
| Drop a database           | `db.dropDatabase()`                                    |


### MongoDB Aggregation Pipeline Stages

The aggregation pipeline in MongoDB allows you to process data from a collection in a series of stages. Here are some common stages used in the aggregation pipeline:

| Stage                  | Description                                             | Example                                    |
|------------------------|---------------------------------------------------------|--------------------------------------------|
| **$match**             | Filters documents based on a condition                  | `{ $match: { age: { $gte: 25 } } }`        |
| **$group**             | Groups documents by a specified key                     | `{ $group: { _id: '$age', count: { $sum: 1 } } }` |
| **$sort**              | Sorts documents based on a field                         | `{ $sort: { age: -1 } }`                   |
| **$limit**             | Limits the number of documents in the output             | `{ $limit: 5 }`                            |
| **$skip**              | Skips a specified number of documents                   | `{ $skip: 2 }`                             |
| **$project**           | Includes or excludes fields in the output               | `{ $project: { name: 1, _id: 0 } }`        |
| **$unwind**            | Deconstructs an array field into separate documents     | `{ $unwind: '$tags' }`                     |
| **$lookup**            | Performs a left outer join with another collection       | `{ $lookup: { from: 'orders', localField: 'name', foreignField: 'customer', as: 'orders' } }` |
| **$addFields**         | Adds new fields to documents                            | `{ $addFields: { fullName: { $concat: ['$firstName', ' ', '$lastName'] } } }` |
| **$replaceRoot**       | Replaces the input document with a new document         | `{ $replaceRoot: { newRoot: '$details' } }` |
| **$out**               | Writes the result of the aggregation to a new collection | `{ $out: 'newCollection' }`               |

Here's an example of using the aggregation pipeline with multiple stages:

```javascript
db.myCollection.aggregate([
  { $match: { age: { $gte: 25 } } }, // Filter documents
  { $group: { _id: '$age', count: { $sum: 1 } } }, // Group by age and count
  { $sort: { _id: 1 } }, // Sort by age
  { $limit: 5 } // Limit to 5 results
]);
```


### MongoDB Index Types
MongoDB supports various types of indexes to improve query performance. Here are some common index types:

| Index Type              | Description                                             | Example                                    |
|-------------------------|---------------------------------------------------------|--------------------------------------------|
| **Single Field Index**  | Indexes a single field                                  | `db.myCollection.createIndex({ name: 1 })` |
| **Compound Index**      | Indexes multiple fields together                        | `db.myCollection.createIndex({ name: 1, age: -1 })` |
| **Multikey Index**      | Indexes arrays of values                               | `db.myCollection.createIndex({ tags: 1 })` |
| **Text Index**          | Indexes text content for text search                    | `db.myCollection.createIndex({ content: 'text' })` |
| **Geospatial Index**    | Indexes geospatial data for location-based queries      | `db.myCollection.createIndex({ location: '2dsphere' })` |
| **Hashed Index**        | Indexes hashed values for equality queries              | `db.myCollection.createIndex({ email: 'hashed' })` |
| **TTL Index**           | Indexes documents based on a time-to-live field         | `db.myCollection.createIndex({ createdAt: 1 }, { expireAfterSeconds: 3600 })` |


### MongoDB Transactions
MongoDB supports multi-document transactions for operations that require atomicity across multiple documents or collections. Here's how you can perform transactions in MongoDB:

```javascript
// Start a session
const session = db.getMongo().startSession();

// Start a transaction
session.startTransaction();

try {
  // Perform operations within the transaction
  db.collection1.insertOne({ name: 'John' }, { session });
  db.collection2.updateOne({ name: 'Jane' }, { $set: { age: 30 } }, { session });

  // Commit the transaction
  session.commitTransaction();
} catch (error) {
  // Abort the transaction on error
  session.abortTransaction();
} finally {
  // End the session
  session.endSession();
}
```

### MongoDB Security
MongoDB provides various security features to protect your data. Here are some common security measures:

- **Authentication**: Require users to authenticate before accessing the database
- **Authorization**: Control access to resources based on user roles and permissions
- **Encryption**: Encrypt data in transit and at rest to prevent unauthorized access
- **Auditing**: Monitor and log database activities for security analysis
- **Network Security**: Configure firewalls and network settings to restrict access to the database
- **Backup and Recovery**: Regularly backup data to prevent data loss in case of security incidents
- **Updates and Patches**: Keep the database software up to date with security patches
- **Role-Based Access Control (RBAC)**: Assign roles to users with specific permissions to access resources
- **IP Whitelisting**: Allow access only from trusted IP addresses to prevent unauthorized access
- **SSL/TLS**: Enable SSL/TLS encryption for secure communication between clients and the database
- **User Authentication**: Use strong passwords and enable two-factor authentication for user accounts
- **Database Auditing**: Monitor database activities and log events for security analysis
- **Data Encryption**: Encrypt sensitive data fields to protect against unauthorized access
- **Database Monitoring**: Use monitoring tools to track database performance and detect anomalies
- **Backup and Recovery**: Regularly backup data to prevent data loss in case of security incidents
- **Incident Response Plan**: Have a plan in place to respond to security incidents and data breaches
- **Security Training**: Provide security training to database administrators and users to raise awareness of security best practices
- **Compliance**: Ensure compliance with data protection regulations and industry standards
- **Vulnerability Scanning**: Regularly scan the database for vulnerabilities and apply security patches
- **Penetration Testing**: Conduct penetration tests to identify and address security weaknesses
- **Security Policies**: Establish security policies and procedures to guide database security practices
- **Data Masking**: Use data masking techniques to obfuscate sensitive data in non-production environments
- **Database Hardening**: Implement security best practices to harden the database against attacks
- **Security Monitoring**: Monitor database activities and network traffic for signs of unauthorized access
- **Access Controls**: Implement access controls to restrict user privileges and prevent unauthorized access


### MongoDB Pros and Cons in markdown table
Here are some of the pros and cons of using MongoDB as a database:

| Pros                                      | Cons                                      |
|-------------------------------------------|-------------------------------------------|
| **Flexible Data Model**: Supports dynamic schemas and nested data structures. | **Lack of ACID Transactions**: Limited support for multi-document transactions. |
| **Scalability**: Easily scales horizontally by adding more servers. | **Memory Usage**: Can consume more memory compared to traditional databases. |
| **Performance**: High read and write throughput with sharding and indexing. | **Complexity**: Requires understanding of document-based data model. |
| **Agility**: Easy to develop and iterate on applications with flexible schemas. | **Query Language**: Limited query capabilities compared to SQL databases. |
| **Community**: Active community support and resources available. | **Learning Curve**: Requires learning new concepts and tools. |
| **JSON Support**: Stores data in JSON-like documents for easy integration with web applications. | **Tooling**: Limited tooling compared to SQL databases. |
| **Use Cases**: Suitable for real-time analytics, content management, and mobile applications. | **Security**: Requires proper configuration for secure deployments. |
| **Cost**: Open-source version available for free with commercial support options. | **Data Size**: Not ideal for applications with complex relationships and joins. |

### MongoDB Fun Facts
- MongoDB is a NoSQL database that stores data in flexible, JSON-like documents.
- MongoDB was first released in 2009 and is developed by MongoDB Inc.
- MongoDB is known for its scalability, flexibility, and ease of use.
- MongoDB uses a document-based data model, which allows for nested data structures and dynamic schemas.
- MongoDB is widely used in web applications, mobile apps, IoT, and big data analytics.
- MongoDB is available in both open-source and commercial editions.
- MongoDB is written in C++, JavaScript, and Go.
- MongoDB supports various programming languages, including JavaScript, Python, Java, and Ruby.
- MongoDB has a rich query language and supports advanced features like aggregation, indexing, and transactions.
- MongoDB is used by companies like Facebook, Google, eBay, and Adobe for various applications.
- MongoDB has a vibrant community of developers and users who contribute to its development and support.
- MongoDB is named after the word "humongous," which means extremely large or massive.