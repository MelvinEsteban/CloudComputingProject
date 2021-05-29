const users = require("./users");
const bcrypt = require('bcrypt');

async function checkLogin(login, password) {
    console.log('Appel de checklogin avec comme params ', JSON.stringify({login, password})) 
    const result = await users.get(login);
    if (result.length > 0) {
        const match = await bcrypt.compare(password, result[0].password_hash)
        if (match) {
            return {
                status: 'ok',
                data: {
                    message: 'match',
                    id: result[0].id_user,
                    login : login
                }
            };
        } else {
            return {
                status: 'error',
                data: {
                    reason: 'bad login/password'
                }
            };
        }
    } else {
        return {
            status: 'error',
            data: {
                reason: 'No users named : ' + login
            }
        }
    }
}


module.exports = checkLogin;