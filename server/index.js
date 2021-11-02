const express = require('express')
const app = express()
const cors = require('cors')
const bp = require('body-parser')
const cp = require('cookie-parser')
const port = 4007

const getContestList = require('./router/getContestList')
const editContest = require('./router/editContest')
const getContest = require('./router/getContest')
const editContestList = require('./router/editContestList')

app.use(express.json())
app.use(cp())
app.use(bp.urlencoded({ limit: '1gb', extended: false }))
app.use(cors({
    origin: ["http://localhost:8080", "http://koldin.myddns.me:8080"],
    sameSite: 'none',
    secure: false,
    httpOnly: true,
    credentials: true,
}))

//여러 대회의 리스트
app.get('/contest-list/:page', getContestList)
app.put('/contest-list/:id', editContestList)

//각 대회 정보
app.get('/contest/:id', getContest)
app.put('/contest/:id', editContest)
app.post('/contest', addContest)

app.listen(port, () => console.log(`the server is running on port ${port}`))