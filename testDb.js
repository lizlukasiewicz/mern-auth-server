require('dotenv').config()
const db = require('./models')
db.connect()

const dbTest = async () => {
    try{
        //TEST CREATE
        const newUser = new db.User({
            name: 'Yubaba',
            email: 'yubaba@blah.com',
            password: 'zeniba'
        })
        await newUser.save()
        console.log('new 🎉 user:', newUser)

        //TEST READ -- happens at login
        const foundUser = await db.User.findOne({
            name: 'Yubaba'
        })
        console.log('found 🔍 user:', foundUser)

    } catch(err) {
        console.log(err)
    }
}

dbTest()