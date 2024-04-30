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
