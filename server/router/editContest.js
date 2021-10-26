const app = require('express').Router()
const mysqli = require('../admin/conn')

app.put('*', async (req, res) => {
    const data = req.body.data
    const id = req.params.id
    
})

async function editContest(params) {
    return new Promise((resolve, reject) => {
        mysqli.query('UPDATE contest SET ', params, (err, res) => {
            if(err) reject(err.code)
            else resolve(res)
        })
    })
}

module.exports = app