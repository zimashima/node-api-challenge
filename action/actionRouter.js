const express = require('express');

const db = require('../data/helpers/actionModel.js')

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const actions = await db.get()
        res.status(200).json(actions)
    }
    catch {
        res.status(500).json({ errorMessage: `500 error`})
    }
})

router.get("/:id", validateActionId, async (req, res) => {
    try {
        const action = await db.get(req.actionId)
        res.status(200).json(action)
    }
    catch {
        res.status(500).json({ errorMessage: `500 error`})
    }
})

router.post("/", validateActionInput,async (req, res) => {
    try{
        const success = await postDb.insert(newPost)
        res.status(201).json(success)
      }
      catch{
        res.status(500).json({ error: "ERROR"})
      }
})

router.delete("/:id", validateActionId, async (req, res) => {
    try {
        const action = await db.remove(req.actionId)
        res.status(200).json({ message: `Action Id: ${req.actionId} is successfully deleted`})
    }
    catch {
        res.status(500).json({ errorMessage: `500 error`})
    }
})

router.put("/:id", validateActionId, async (req, res) => {
    try {
        const actions = await db.put(req.actionId)
        res.status(200).json(actions)
    }
    catch {
        res.status(500).json({ errorMessage: `500 error`})
    }
})

//middleware

async function validateActionId(req, res, next){
    const action = await db.get(req.params.id)
    if (action){
      req.actionId = action.id
      next()
    } else {
      res.status(400).json({ message: "Invalid action id" })
    }
}

function validateActionInput(req, res, next){
    if (!req.body){
        res.status(400).json({ message: `Please make sure the request is not empty` })
      } else if (!req.body.description) {
        res.status(400).json({ message: `Please make sure that DESCRIPTION field is not empty` })
      } else {
        next()
      }
}

module.exports = router