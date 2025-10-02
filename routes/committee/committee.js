const express = require('express')
const router = express.Router()
const modelCommittees = require('../../model/committees')
const bcrypt = require('bcryptjs')

router.get('/ubah-kata-sandi', async (req, res) => {
    try {
        res.render('committee/committee/changePassword', {
            data: req.flash('data')[0]
        })
    } catch (err) {
        console.log(err)
        req.flash('error', err.message)
        res.redirect('/')
    }
})

router.post('/change-password', async (req, res) => {
    try {
        const {password, newPassword, confirmNewPassword} = req.body
        const data = {password, newPassword, confirmNewPassword}
        // panitiaId = req.session.adminId
        const panitiaId = 3
        const panitia = await modelCommittees.getById(panitiaId)

        if (!password) {
            req.flash('error', 'Password tidak boleh kosong')
            req.flash('data', data)
            return res.redirect('/panitia/ubah-kata-sandi')
        }

        if (!newPassword) {
            req.flash('error', 'Password baru tidak boleh kosong')
            req.flash('data', data)
            return res.redirect('/panitia/ubah-kata-sandi')
        }

        if (!confirmNewPassword) {
            req.flash('error', 'Konfirmasi password tidak boleh kosong')
            req.flash('data', data)
            return res.redirect('/panitia/ubah-kata-sandi')
        }

        if (!panitia) {
            req.flash('error', 'Panitia tidak ditemukan')
            req.flash('data', data)
            return res.redirect('/panitia/ubah-kata-sandi')
        }

        if (!(await bcrypt.compare(password, panitia.password))) {
            req.flash('error', 'Password tidak cocok')
            req.flash('data', data)
            return res.redirect('/panitia/ubah-kata-sandi')
        }

        if (newPassword.length < 6) {
            req.flash('error', 'Password minimal 6 karakter')
            req.flash('data', data)
            return res.redirect('/panitia/ubah-kata-sandi')
        }

        if (!/[A-Z]/.test(newPassword)) {
            req.flash('error', 'Password minimal 1 huruf kapital')
            req.flash('data', data)
            return res.redirect('/panitia/ubah-kata-sandi')
        }

        if (!/[a-z]/.test(newPassword)) {
            req.flash('error', 'Password minimal 1 huruf kecil')
            req.flash('data', data)
            return res.redirect('/panitia/ubah-kata-sandi')
        }

        if (!/\d/.test(newPassword)) {
            req.flash('error', 'Password minimal 1 angka')
            req.flash('data', data)
            return res.redirect('/panitia/ubah-kata-sandi')
        }

        if (newPassword != confirmNewPassword) {
            req.flash('error', 'Password baru dan konfirmasi password tidak cocok')
            req.flash('data', data)
            return res.redirect('/panitia/ubah-kata-sandi')
        }

        await modelCommittees.updatePasswordCommittee(data, panitiaId)

        req.flash('success', 'Password berhasil diubah')
        res.redirect('/panitia/dashboard')
    } catch (err) {
        console.log(err)
        req.flash('error', err.message) 
        res.redirect('/panitia/dashboard')
    }
})

module.exports = router