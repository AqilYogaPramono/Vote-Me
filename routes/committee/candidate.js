const express = require('express')
const router = express.Router()
const modelCandidate = require('../../model/candidates')
const multer = require('multer')
const path = require('path')
const fs = require('fs')

const stripImgTags = (html) => {
    if (!html || typeof html !== 'string') return html
    return html.replace(/<img\b[^>]*>/gi, '')
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/candidates/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + path.extname(file.originalname))
    }
})

const deleteUploadedFile = (file) => {
    if (file) {
        const filePath = path.join(process.cwd(), 'public', 'images', 'candidates', file.filename)
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath)
    }
}

const deleteOldPhoto = (oldPhoto) => {
    if (oldPhoto) {
        const filePath = path.join(process.cwd(), 'public', 'images', 'candidates', oldPhoto)
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath)
    }
}

const upload = multer({ storage: storage })

router.get('/', async (req, res) => {
    try {
        const candidates = await modelCandidate.getCandidates()
        res.render('committee/candidate/index', { candidates })
    } catch (err) {
        console.log(err)
        req.flash('error', err.message)
        res.redirect('/panitia/dashboard')
    }
})

router.get('/buat', async (req, res) => {
    try {
        res.render('committee/candidate/create')
    } catch (err) {
        console.log(err)
        req.flash('error', err.message)
        res.redirect('/panitia/kandidat')
    }
})

router.get('/preview/:id', async (req, res) => {
    try {
        const {id} = req.params
        const candidates = await modelCandidate.getById(id)
        res.render('committee/candidate/detailCandidate', { candidates })
    } catch (err) {
        console.log(err)
        req.flash('error', err.message)
        res.redirect('/panitia/dashboard')
    }
})

router.post('/create', (req, res) => {
    upload.single('candidate_photo')(req, res, async (err) => {
        try {
            const { candidate_number,  chair_candidate_name,  vice_chair_candidate_name } = req.body
            const vision = stripImgTags(req.body.vision)
            const mission = stripImgTags(req.body.mission)
            const work_program = stripImgTags(req.body.work_program)

            const candidate_photo = req.file ? req.file.filename : null

            const data = { candidate_number, chair_candidate_name, vice_chair_candidate_name, vision, mission, work_program, candidate_photo }

            if (req.file && req.file.size > 5 * 1024 * 1024) {
                deleteUploadedFile(req.file)
                req.flash('error', 'Ukuran foto laporan tidak boleh lebih dari 5Mb.')
                return res.redirect('/panitia/kandidat')
            }

            const allowedFormats = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp']
            if (req.file && !allowedFormats.includes(req.file.mimetype)) {
                deleteUploadedFile(req.file)

                req.flash('error', 'Format foto harus JPG, JPEG, PNG, atau WEBP.')
                return res.redirect('/panitia/kandidat')
            }
            
            await modelCandidate.store(data)
            req.flash('success', 'Kandidat berhasil ditambahkan')
            res.redirect('/panitia/kandidat')
        } catch (error) {
            console.log(error)
            req.flash('error', error.message)
            res.redirect('/panitia/kandidat')
        }
    })
})

router.get('/edit/:id', async (req, res) => {
    try {
        const { id } = req.params
        const candidate = await modelCandidate.getById(id)
        res.render('committee/candidate/edit', { candidate })
    } catch (err) {
        console.log(err)
        req.flash('error', err.message)
        res.redirect('/panitia/kandidat')
    }
})

router.post('/update/:id', (req, res) => {
    upload.single('candidate_photo')(req, res, async (err) => {
        try {
            const { id } = req.params
            const { candidate_number, chair_candidate_name, vice_chair_candidate_name } = req.body
            const vision = stripImgTags(req.body.vision)
            const mission = stripImgTags(req.body.mission)
            const work_program = stripImgTags(req.body.work_program)
            const data = {candidate_number,chair_candidate_name,vice_chair_candidate_name,vision,mission,work_program}

            if (req.file && req.file.size > 5 * 1024 * 1024) {
                deleteUploadedFile(req.file)
                req.flash('error', 'Ukuran foto laporan tidak boleh lebih dari 5Mb.')
                return res.redirect('/panitia/kandidat')
            }

            const allowedFormats = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp']
            if (req.file && !allowedFormats.includes(req.file.mimetype)) {
                deleteUploadedFile(req.file)
                req.flash('error', 'Format foto harus JPG, JPEG, PNG, atau WEBP.')
                return res.redirect('/panitia/kandidat')
            }

            if (req.file) {
                const existing = await modelCandidate.getById(id)
                if (existing && existing.candidate_photo) deleteOldPhoto(existing.candidate_photo)
                data.candidate_photo = req.file.filename
            }

            await modelCandidate.update(id, data)
            req.flash('success', 'Kandidat berhasil diupdate')
            res.redirect('/panitia/kandidat')
        } catch (error) {
            console.log(error)
            req.flash('error', error.message)
            res.redirect('/panitia/kandidat')
        }
    })
})

router.post('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params
        const existing = await modelCandidate.getById(id)
        if (existing && existing.candidate_photo) deleteOldPhoto(existing.candidate_photo)

        await modelCandidate.delete(id)
        req.flash('success', 'Kandidat berhasil dihapus')
        res.redirect('/panitia/kandidat')
    } catch (err) {
        console.log(err)
        req.flash('error', err.message)
        res.redirect('/panitia/kandidat')
    }
})


module.exports = router