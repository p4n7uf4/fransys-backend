const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'fransys',
    password: '3ssaenhaehtop',
    port: 5432
})

const getAllPatients = (req, res) => {
    pool.query('select * from pacientes', (error, results) => {
        if (error) {
            throw error
        }

        res.json(results.rows)
    })
}

const getPatientById = (req, res) => {
    const id = parseInt(req.params.id)
    pool.query('select * from pacientes where id = $1', [id], (error, results) => {
        if (error) throw error
        res.json(results.rows)
    })
}

const createPatient = (req, res) => {
    const { name, birthDate, endereco, telephone, anamnese } = req.body

    pool.query('insert into pacientes (nome, dataNascimento, endereco, telefone, anamnase) values ($1, $2, $3, $4, $5)', 
        [name, birthDate, endereco, telephone, anamnese], (error, results) => {
            if (error) throw error
            res.status(201).send(`Paciente adicionado com ID: ${results.insertId}`)
        })
}

const deletePatient = (req, res) => {
    const id = parseInt(req.params.id)
    pool.query('DELETE FROM pacientes WHERE id = $1', [id], (error, result) => {
        if (error) throw error
        console.log(`Paciente com o ID ${req.params.id} excluido com sucesso.`)
        res.send(`Paciente com o ID ${req.params.id} exluido com sucesso.`)
    })
}

module.exports = {
    getAllPatients,
    getPatientById,
    createPatient,
    deletePatient
}