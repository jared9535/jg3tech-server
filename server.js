const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all requests
app.use(cors());

// Dummy Amazon Orders Endpoint
app.get('/fetch-amazon-orders', (req, res) => {
    const exampleOrders = [
        {
            name: "John Doe",
            address: "123 Example St, City, ST i
            product: "24 Note uPedals",
            orderDate: "04/19/2025",
            shipByDate: "04/24/2025",
            source: "Amazon",
            completed: false,
            returned: false,
            invoice: "Paid",
            email: "john@example
