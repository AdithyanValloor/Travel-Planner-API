const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Plan = require('../Model/Plan')

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const destinations = await Plan.find()
        res.status(200).json(destinations)
    } catch (error) {
        res.status(400).json({error})
    }
})

router.get('/:id', async (req, res) => {
    try {
        const planId = req.params.id
        const plan = await Plan.findById(planId)
        if(!plan) res.status(400).json({message:"Plan doesn't exit"})
        res.status(200).json(plan)
    } catch (error) {
        res.status(400).json({error:error})
    }
})

router.post('/', async (req, res) => {
    try {
        const { destination, startDate, endDate, activities } = req.body;
        const newPlan = { destination, startDate, endDate, activities };

        var plan = new Plan(newPlan)
        await plan.save()
        res.status(200).json({message:"Plan added", plan})
    } catch (error) {
        res.status(500).json({error:error})
    }
})

router.patch('/:id', async (req, res) => {
    try {
        const planId = req.params.id
        const plan = await Plan.findByIdAndUpdate(planId, req.body, {new:true})
        if(!plan) return res.status(400).json({message:"Plan doesnt exist"})
        res.status(200).json({message:"Plan updated", plan})  
    } catch (error) {
        res.status(500).json({error:error})
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const planId = req.params.id
        const plan = await Plan.findByIdAndDelete(planId)
        if(!plan) return res.status(400).json({message:"Plan doesnt exist"})
        res.status(200).json({message:"Plan deleted", plan})
    } catch (error) {
        res.status(500).json({error:error})
    }
})

module.exports = router