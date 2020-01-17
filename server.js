const express = require('express')

const actionRouter = require('./action/actionRouter')
const projectRouter = require('./project/projectRouter')
// const cors = require('cors')

const server = express()

server.use(express.json())
server.use(logger)
// server.use(cors)

server.get("/", (req,res) => {
    res.send(`<h1>GOOD JOB</h1>`)
})


function logger(req, res, next) {
    const { method, originalUrl } = req;
    console.log(`${method} to ${originalUrl}`);
  
    next();
  }

server.use('/api/actions', actionRouter)
server.use('/api/projects', projectRouter)


module.exports = server