const express = require('express')
const router = express.Router()
const modelUsers = require('../../model/users')
const modelCandidates = require('../../model/candidates')
const modelEnrollmentYears = require('../../model/enrollmentyears')
const modelFaculties = require('../../model/faculties')
const modelDepartments = require('../../model/departments')
const modelMajors = require('../../model/majors')

router.get('/', async (req, res) => {
    try {
        const countUsers = await modelUsers.getCountUsers()
        const countCandidates = await modelCandidates.getCountCandidates()
        const countEnrollmentYears = await modelEnrollmentYears.getCountEnrollmentYears()
        const countFaculties = await modelFaculties.getCountFaculties()
        const countDepartments = await modelDepartments.getCountDepartments()
        const countMajors = await modelMajors.getCountMajors()

        res.render('committee/dashboard', { countUsers, countCandidates, countEnrollmentYears, countFaculties, countDepartments, countMajors })
    } catch (err) {
        console.log(err)
        req.flash('error', err.message)
        res.redirect('/')
    }
})

module.exports = router