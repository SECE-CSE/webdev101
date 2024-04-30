import app from "./app";
import connectToDatabase from "./config/db-config";
import "./config/env-config";

const port = process.env.PORT || 3000;

// Connect to the database
connectToDatabase();

// Start the server
app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}/`);
});
