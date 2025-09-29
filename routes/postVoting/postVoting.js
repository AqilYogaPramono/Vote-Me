const express = require('express')
const router = express.Router()

router.get('/tahun-angkatan', (req, res) => {
    res.render('postVoting/enrollmentYear')
})

router.get('/fakultas', (req, res) => {
    res.render('postVoting/faculty')
})

router.get('/departemen', (req, res) => {
    res.render('postVoting/department')
})

router.get('/jurusan', (req, res) => {
    res.render('postVoting/major')
})

router.get('/gender', (req, res) => {
    res.render('postVoting/gender')
})

module.exports = router