import express from "express";

const PORT = 8000;
const app = express();
app.use(express.json());

let customers = [
    {id: 1, name: 'Adam', email: 'adamcsill@gmail.com'},
    {id: 2, name: 'Bela', email: 'bellgil24@gmail.com'},
    {id: 3, name: 'Cecil', email: 'ceccic5@gmail.com'},
    {id: 4, name: 'David', email: 'daveker@gmail.com'}
];

app.get('/customers', (req, res) => {
    res.status(200).json(customers);
})

app.get('/customers/:id', (req, res) => {
    const id = +req.params.id;
    const [customer] = customers.filter((customer) => customer.id === id);
    if(!customer){
        res.status(404).json({message: 'Customer not found'})
    }
    res.status(200).json(customer)
})

app.post('/customers', (req, res) => {
    const {name, email} = req.body;
    if (!name || !email) {
        res.status(400).json({message: 'Invalid credectials'})
    }
    const id = customers[customers.length - 1]?.id + 1 || 1
    const customer = {id, name, email}
    customers.push(customer)
    res.status(201).json(customer)
})

app.put('/customers/:id', (req, res) => {
    const id = +req.params.id;
    const [customer] = customers.filter((customer) => customer.id === id);
    if(!customer){
        res.status(404).json({message: 'Customer not found'})
    }
    const {name, email} = req.body;
    if (!name || !email) {
        res.status(400).json({message: 'Invalid credectials'})
    }
    const index = customers.indexOf(customer)
    customers[index] = {id, name, email}
    res.status(200).json(customers[index])
})

app.delete('/customers/:id', (req, res) => {
    const id = +req.params.id;
    customers = customers.filter((customer) => customer.id !== id);
    res.status(200).json({message: 'Delete successfully'})

})

app.listen(PORT, () => {
    console.log(`Server runs on port http://localhost:${PORT}`)
});
