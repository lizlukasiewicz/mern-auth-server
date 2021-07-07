const jwt = require('jsonwebtoken')

const jwtTest = () => {
    try {
        // USER LOGIN PROCESS:
        //create the data payload
        const payload = {
            name: 'zeniba',
            id: 6
        }

        // signing the jwt
        const token = jwt.sign(payload, 'This is my secret', { expiresIn: 60 })
        console.log(token)

        //request to server:

        //decode the incoming jwt
        const decoded = jwt.verify(token, 'This is my secret')
        console.log(decoded)
        
    } catch (err) {
        console.log(err)
    }
}
jwtTest()