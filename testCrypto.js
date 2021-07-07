const bcrypt = require('bcryptjs')

const cryptoTest = async() => {
    try {
        //2 THINGS NEEDED: 1. PASSWORD
        const password = 'hello'
        //SPECIFY THE SALT ROUNDS (standard: 12 salt rounds)
        const salt = 12
        //hash the password
        const hashedPassword = await bcrypt.hash(password, salt)
        console.log(hashedPassword)

        //when checking user login
        const match = await bcrypt.compare('hello', hashedPassword)
        console.log('🤼‍♂️ match:', match)

    } catch (error) {
        console.log(error)
    }

}
cryptoTest()