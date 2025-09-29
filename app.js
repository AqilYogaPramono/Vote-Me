var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
require('dotenv').config()

var indexRouter = require('./routes/index')

//folder admin
const adminDashboard = require('./routes/admin/dashboard')
const adminCommiteeRouter = require('./routes/admin/commitee')

//folder auth
const authRouter = require('./routes/auth/auth')

//folder committee
const candidateRouter = require('./routes/committee/candidate')
const committeeRouter = require('./routes/committee/committee')
const dashboardCommitteeRouter = require('./routes/committee/dashboard')
const departmentRouter = require('./routes/committee/department')
const enrollmentYearRouter = require('./routes/committee/enrollmentYear')
const facultyRouter = require('./routes/committee/faculty')
const majorRouter = require('./routes/committee/major')
const participationRouter = require('./routes/committee/participant')

//folder participant
const participantRouter = require('./routes/participant/participant')

//folder postVoting
const postVotingRouter = require('./routes/postVoting/postVoting')

//folder preVoting
const preVotingRouter = require('./routes/preVoting/preVoting')

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)

//folder admin
app.use('/admin/dashboard', adminDashboard)
app.use('/admin/committee', adminCommiteeRouter)

//folder auth
app.use('/', authRouter)

//folder committee
app.use('/panitia/candidate', candidateRouter)
app.use('/panitia', committeeRouter)
app.use('/panitia/dashboard', dashboardCommitteeRouter)
app.use('/panitia/department', departmentRouter)
app.use('/panitia/enrollmentYear', enrollmentYearRouter)
app.use('/panitia/faculty', facultyRouter)
app.use('/panitia/major', majorRouter)
app.use('/panitia/participation', participationRouter)

//folder participant
app.use('/participant', participantRouter)

//folder postVoting
app.use('/', postVotingRouter)

//folder preVoting
app.use('/', preVotingRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
