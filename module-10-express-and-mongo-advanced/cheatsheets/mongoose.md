# Mongoose Cheatsheet
Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. It provides a simple schema-based solution to model your application data.

### Mongoose operations with Examples

| Operation         | Example Code                                      | Description                                 |
|-------------------|---------------------------------------------------|---------------------------------------------|
| **Connection**    | `mongoose.connect('mongodb://localhost:27017/mydb');` | Connects to a MongoDB database           |
| **Schema**        | `const schema = new mongoose.Schema({ name: String, age: Number });` | Defines a new schema for a model |
| **Model**         | `const Model = mongoose.model('ModelName', schema);` | Creates a model based on the schema      |
| **Create**        | `Model.create({ name: 'Alice', age: 30 });`       | Adds a new document to the collection     |
| **Find**          | `Model.find({ name: 'Alice' }).then(console.log);` | Finds documents based on a query          |
| **Find One**      | `Model.findOne({ name: 'Alice' }).then(console.log);` | Finds the first document matching the query |
| **Find by ID**    | `Model.findById('60d5f40d7c8b1e4f7c3c9b50').then(console.log);` | Finds a document by its ID             |
| **Find & Update** | `Model.findOneAndUpdate({ name: 'Alice' }, { age: 25 });` | Finds one document and updates it       |
| **Find & Delete** | `Model.findOneAndDelete({ name: 'Alice' });`      | Finds one document and deletes it         |
| **Find by ID & Update** | `Model.findByIdAndUpdate('60d5f40d7c8b1e4f7c3c9b50', { age: 25 }).then(console.log);` | Finds a document by ID and updates it |
| **Find by ID & Delete** | `Model.findByIdAndDelete('60d5f40d7c8b1e4f7c3c9b50').then(console.log);` | Finds a document by ID and deletes it |
| **Update**        | `Model.updateOne({ name: 'Alice' }, { age: 25 });` | Updates one document matching the query  |
| **Update Many**   | `Model.updateMany({ age: { $lt: 30 } }, { age: 30 });` | Updates multiple documents matching the query |
| **Delete One**    | `Model.deleteOne({ name: 'Alice' });`            | Deletes one document matching the query  |
| **Delete Many**   | `Model.deleteMany({ age: { $lt: 30 } });`        | Deletes multiple documents matching the query |
| **Count**         | `Model.countDocuments({ age: { $lt: 30 } });`    | Counts documents matching the query     |
| **Aggregation**   | `Model.aggregate([{ $match: { name: 'Alice' } }]);` | Performs aggregation operations          |
| **Populate**      | `Model.findOne({ name: 'Alice' }).populate('friends').then(console.log);` | Populates references in documents |
| **Projection**    | `Model.find({ name: 'Alice' }, 'age name -_id').then(console.log);` | Projects specific fields from documents |
| **Sorting**       | `Model.find({ name: 'Alice' }).sort({ age: -1 }).then(console.log);` | Sorts documents based on specified fields |
| **Limits**        | `Model.find({ name: 'Alice' }).limit(2).then(console.log);` | Limits the number of documents returned |
| **Skipping**      | `Model.find({ name: 'Alice' }).skip(2).then(console.log);` | Skips the first few documents and returns the rest |
| **Distinct**      | `Model.distinct('name').then(console.log);`       | Finds distinct values of a field         |
| **Validation**    | `schema.path('name').validate(name => name.length > 0);` | Adds validation rules to the schema |
| **Indexing**      | `schema.index({ name: 1 });`                      | Creates an index for efficient queries  |
| **Middleware**    | `schema.pre('save', function (next) { ... });`    | Adds pre/post hooks for middleware        |

### Mongoose Schema Types

| Type       | Description |
|------------|-------------|
| `String`   | String type |
| `Number`   | Number type |
| `Date`     | Date type   |
| `Buffer`   | Binary data type |
| `Boolean`  | Boolean type |
| `Mixed`    | Mixed type  |
| `ObjectId` | Object ID type |
| `Array`    | Array type  |

### Mongoose Schema Options

| Option       | Description |
|--------------|-------------|
| `type`       | Data type   |
| `required`   | Field is required |
| `default`    | Default value |
| `unique`     | Field value must be unique |
| `min`        | Minimum value |
| `max`        | Maximum value |
| `enum`       | Enumerated values |
| `validate`   | Custom validation function |
| `index`      | Index the field for faster queries |
| `ref`        | Reference to another model |


### Mongoose Query Operators with Examples

| Operator | Description | Example |
|----------|-------------|---------|
| `$eq`    | Matches values that are equal to a specified value | `{ age: { $eq: 30 } }` |
| `$gt`    | Matches values that are greater than a specified value | `{ age: { $gt: 30 } }` |
| `$gte`   | Matches values that are greater than or equal to a specified value | `{ age: { $gte: 30 } }` |
| `$lt`    | Matches values that are less than a specified value | `{ age: { $lt: 30 } }` |
| `$lte`   | Matches values that are less than or equal to a specified value | `{ age: { $lte: 30 } }` |
| `$ne`    | Matches all values that are not equal to a specified value | `{ age: { $ne: 30 } }` |
| `$in`    | Matches any of the values specified in an array | `{ age: { $in: [30, 40] } }` |
| `$nin`   | Matches none of the values specified in an array | `{ age: { $nin: [30, 40] } }` |
| `$and`   | Joins query clauses with a logical AND | `{ $and: [{ age: 30 }, { name: 'Alice' }] }` |
| `$or`    | Joins query clauses with a logical OR | `{ $or: [{ age: 30 }, { name: 'Alice' }] }` |
| `$not`   | Inverts the effect of a query expression | `{ age: { $not: { $eq: 30 } } }` |
| `$nor`   | Joins query clauses with a logical NOR | `{ $nor: [{ age: 30 }, { name: 'Alice' }] }` |
| `$exists`| Matches documents that have the specified field | `{ age: { $exists: true } }` |
| `$type`  | Selects documents if a field is of the specified type | `{ age: { $type: 'number' } }` |
| `$regex` | Selects documents where a field matches a regular expression | `{ name: { $regex: '^A' } }` |
| `$text`  | Performs text search | `{ $text: { $search: 'Alice' } }` |
| `$where` | Matches documents that satisfy a JavaScript expression | `{ $where: 'this.age > 30' }` |

### Mongoose Aggregation Operators with Examples

| Operator | Description | Example |
|----------|-------------|---------|
| `$match` | Filters documents | `{ $match: { age: { $gte: 30 } } }` |
| `$group` | Groups documents by a specified key | `{ $group: { _id: '$name', total: { $sum: 1 } } }` |
| `$sort`  | Sorts documents | `{ $sort: { age: 1 } }` |
| `$limit` | Limits the number of documents | `{ $limit: 5 }` |
| `$skip`  | Skips a specified number of documents | `{ $skip: 5 }` |
| `$unwind`| Deconstructs an array field | `{ $unwind: '$friends' }` |
| `$lookup`| Performs a left outer join | `{ $lookup: { from: 'users', localField: 'userId', foreignField: '_id', as: 'user' } }` |
| `$project`| Projects specific fields | `{ $project: { name: 1, age: 1 } }` |
| `$addFields`| Adds new fields | `{ $addFields: { fullName: { $concat: ['$firstName', ' ', '$lastName'] } } }` |
| `$replaceRoot`| Replaces the root document | `{ $replaceRoot: { newRoot: '$user' } }` |
| `$count` | Counts the number of documents | `{ $count: 'total' }` |
| `$facet` | Processes multiple aggregation pipelines | `{ $facet: { total: [{ $count: 'total' }], average: [{ $group: { _id: null, avgAge: { $avg: '$age' } } }] } }` |

### Mongoose Middleware Hooks with Examples

| Hook       | Description | Example |
|------------|-------------|---------|
| `init`     | Runs when a document is initialized | `schema.pre('init', function (next) { ... });` |
| `validate` | Runs when a document is validated | `schema.pre('validate', function (next) { ... });` |
| `save`     | Runs when a document is saved | `schema.pre('save', function (next) { ... });` |
| `remove`   | Runs when a document is removed | `schema.pre('remove', function (next) { ... });` |
| `updateOne`| Runs before an `updateOne` operation | `schema.pre('updateOne', function (next) { ... });` |
| `findOneAndUpdate`| Runs before a `findOneAndUpdate` operation | `schema.pre('findOneAndUpdate', function (next) { ... });` |
| `findOneAndDelete`| Runs before a `findOneAndDelete` operation | `schema.pre('findOneAndDelete', function (next) { ... });` |
| `insertMany`| Runs before an `insertMany` operation | `schema.pre('insertMany', function (next) { ... });` |
| `aggregate`| Runs before an `aggregate` operation | `schema.pre('aggregate', function (next) { ... });` |


### Mongoose Virtuals with Examples

Virtuals are document properties that you can get and set but that do not get persisted to MongoDB.

```javascript
const schema = new mongoose.Schema({
  firstName: String,
  lastName: String
});

schema.virtual('fullName').get(function() {
  return this.firstName + ' ' + this.lastName;
});

const Model = mongoose.model('Model', schema);

const doc = new Model({ firstName: 'Alice', lastName: 'Smith' });
console.log(doc.fullName); // Alice Smith
```

### Mongoose Plugins with Examples

Plugins are reusable pieces of schema middleware that can be added to a schema.

```javascript
const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const schema = new mongoose.Schema({ name: String });
schema.plugin(timestamp);

const Model = mongoose.model('Model', schema);
```

### Mongoose Transactions with Examples

Transactions allow you to perform multiple operations on multiple documents in a way that guarantees atomicity and isolation.

```javascript
const session = await mongoose.startSession();
session.startTransaction();

try {
  await Model1.create({ name: 'Alice' }, { session: session });
  await Model2.create({ name: 'Bob' }, { session: session });

  await session.commitTransaction();
} catch (error) {
  await session.abortTransaction();
} finally {
  session.endSession();
}
```

### Mongoose Indexes with Examples

Indexes can improve the performance of queries by allowing MongoDB to quickly locate the documents.

```javascript
const schema = new mongoose.Schema({ name: String });
schema.index({ name: 1 });

const Model = mongoose.model('Model', schema);
```

### Mongoose Population with Examples

Population is the process of automatically replacing the specified paths in a document with documents from other collections.

```javascript
const userSchema = new mongoose.Schema({ name: String });
const User = mongoose.model('User', userSchema);

const postSchema = new mongoose.Schema({ title: String, author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } });

const Post = mongoose.model('Post', postSchema);

Post.findOne({ title: 'Post 1' }).populate('author').exec(function (err, post) {
  console.log(post.author.name); // Alice
});
```
