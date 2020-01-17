const express = require('express')

const actionRouter = require('./action/actionRouter')
const projectRouter = require('./project/projectRouter')
const cors = require('cors')

const server = express()

server.use(express.json())
server.use(cors())
server.use(logger)


server.get("/", (req,res) => {
    res.send(`<h1>GOOD JOB</h1>`)
})


function logger(req, res, next) {
    const { method, originalUrl } = req;
    console.log(`${method} to ${originalUrl}`);
  
    next();
  }

server.use('/api/projects', projectRouter)
server.use('/api/actions', actionRouter)


module.exports = server