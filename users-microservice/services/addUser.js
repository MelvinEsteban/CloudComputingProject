const users = require("./users");
const bcrypt = require('bcrypt');

const saltRounds = 10;

async function addUser(login, password) {
    console.log('Appel de addUser avec comme params ', JSON.stringify({
        login,
        password
    }))
    
    //Verification if login doesn't exist
    const user = await users.get(login) ;
    if (user.length > 0)
    {
        return { status: 'error', data : { reason : "Login already used"}}
    }

    const hash = await bcrypt.hash(password, saltRounds)
    const result = await users.add(login, hash);
    if (result.affectedRows) {
        return {
            status: 'ok',
            data: {
                message: 'Users created successfully',
                id: result.insertId,
                login : login
            }
        };
    } else {
        return {
            status: 'error',
            data: {
                reason: 'Error in creating users'
            }
        };
    };
}

module.exports = addUser;