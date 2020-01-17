const express = require('express');

const actionDb = require('../data/helpers/actionModel.js')
const projectDb = require('../data/helpers/projectModel.js')

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const actions = await actionDb.get()
        res.status(200).json(actions)
    }
    catch {
        res.status(500).json({ errorMessage: `500 error`})
    }
})

router.get("/:id", validateActionId, async (req, res) => {
    try {
        const action = await actionDb.get(req.actionId)
        res.status(200).json(action)
    }
    catch {
        res.status(500).json({ errorMessage: `500 error`})
    }
})

router.post("/", validateActionInput, validateProjectId, async (req, res) => {
    try{
        console.log(req.body)
        const success = await actionDb.insert(req.body)
        res.status(201).json(success)
      }
      catch{
        res.status(500).json({ error: "ERROR"})
      }
})

router.delete("/:id", validateActionId, async (req, res) => {
    try {
        const action = await actionDb.remove(req.actionId)
        res.status(200).json({ message: `Action Id: ${req.actionId} is successfully deleted`})
    }
    catch {
        res.status(500).json({ errorMessage: `500 error`})
    }
})

router.put("/:id", validateActionId, validateProjectId, async (req, res) => {
    try {
        const actions = await actionDb.update(req.actionId, req.body)
        const updatedProject = await projectDb.get(req.body.project_id)
        res.status(200).json(updatedProject)
    }
    catch {
        res.status(500).json({ errorMessage: `500 error`})
    }
})

//middleware

async function validateProjectId(req, res, next){
    const project = await projectDb.get(req.body.project_id)
    if (project){
      next()
    } else {
      res.status(400).json({ message: "Invalid Project id" })
    }
}

async function validateActionId(req, res, next){
    const action = await actionDb.get(req.params.id)
    if (action){
      req.actionId = action.id
      next()
    } else {
      res.status(400).json({ message: "Invalid Action id" })
    }
}

function validateActionInput(req, res, next){
    if (!req.body){
        res.status(400).json({ message: `Please make sure the REQUEST BODY is not empty` })
      } else if (!req.body.project_id){
        res.status(400).json({ message: `Please make sure the PROJECT_ID is not empty` })
      } else if (!req.body.description) {
        res.status(400).json({ message: `Please make sure that DESCRIPTION field is not empty` })
      } else if (!req.body.notes) {
        res.status(400).json({ message: `Please make sure that NOTE field is not empty` })
      }else {
        next()
      }
}

module.exports = router