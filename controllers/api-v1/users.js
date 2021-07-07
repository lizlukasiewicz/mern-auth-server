const router = require('express').Router()
const db = require('../../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

//GET  /users --- test api endpoint
router.get('/', (req, res) => {
    res.json({ msg: '🖖🏻 hey there user endpoint is okie dokie'})
})

//POST /users/register -- CREATE a new user (aka registration aka create a new account)
router.post ('/register', async (req, res) => {
    try {
        //check if user exists already
        const findUser = await db.User.findOne({
            email: req.body.email
        })
        //if the user us found -- dont let them register
        if(findUser) return res.status(400).json({msg: 'user already exists'})
        console.log(findUser)

        //hash password from req.body
        const password = req.body.password
        const salt = 12
        const hashedPassword = await bcrypt.hash(password, salt)

        //create our new user
        const newUser = db.User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        await newUser.save()

        // create the jwt payload
        const payload = {
            name: newUser.name,
            email: newUser.email,
            id: newUser.id
        }

        //sign the jwt and send a response 
        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: 60 * 60 })
        res.json({ token })
    } catch (err) {
        console.log(err)
        res.status(500).json({ msg: 'internal server error' })
    }
})

// POST /user/login --- validate login credentials

// GET /auth-locked -- middleware that checks if userware is allowed to be here - will redirect if a bad jwt is found


module.exports = router