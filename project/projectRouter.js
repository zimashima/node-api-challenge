const express = require('express');

const db = require('../data/helpers/projectModel.js')

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const projects = await db.get()
        res.status(200).json(projects)
    }
    catch {
        res.status(500).json({ errorMessage: `500 error`})
    }
})

router.get("/:id", validateProjectId, async (req, res) => {
    try {
        const project = await db.get(req.projectId)
        res.status(200).json(project)
    }
    catch {
        res.status(500).json({ errorMessage: `500 error`})
    }
})

router.post("/", validateProjectInput, async (req, res) => {
    try{
        const success = await db.insert(req.body)
        res.status(201).json(success)
      }
      catch{
        res.status(500).json({ errorMessage: "500 ERROR"})
      }
})

router.delete("/:id", validateProjectId, async (req, res) => {
    try {
        const project = await db.remove(req.projectId)
        res.status(200).json({ message: `Project Id: ${req.projectId} is successfully deleted`})
    }
    catch {
        res.status(500).json({ errorMessage: `500 error`})
    }
})

router.put("/:id", validateProjectId, validateProjectInput, async (req, res) => {
    try {
        const projects = await db.update(req.projectId, req.body)
        res.status(200).json(projects)
    }
    catch {
        res.status(500).json({ errorMessage: `500 error`})
    }
})

//middleware

async function validateProjectId(req, res, next){
    const project = await db.get(req.params.id)
    if (project){
      req.projectId = project.id
      next()
    } else {
      res.status(400).json({ message: "Invalid Project id" })
    }
}

function validateProjectInput(req, res, next){
    if (!req.body){
        res.status(400).json({ message: `Please make sure the REQUEST BODY is not empty` })
      } else if (!req.body.name) {
        res.status(400).json({ message: `Please make sure that NAME field is not empty` })
      } else if (!req.body.description){
        res.status(400).json({ message: `Please make sure that DESCRIPTION field is not empty` })
      } else {
        next()
      }
}

module.exports = router