const express = require('express')
const db = require ('./src/db/db')

const app = express();

app.use(express.json())

app.get('/patients', db.getAllPatients)

app.get('/patients/:id', db.getPatientById)

app.post('/patients', db.createPatient)


app.listen(3005, () => {
    console.log('listening on port 3005')
})