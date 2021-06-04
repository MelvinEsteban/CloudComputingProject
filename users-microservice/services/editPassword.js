const users = require("./users");
const bcrypt = require('bcrypt');

const saltRounds = 10;

async function editPassword(idUser, newPassword) {
    console.log('Call of editPassword with ', JSON.stringify({
        idUser,
        newPassword
    }))

    const hash = await bcrypt.hash(newPassword, saltRounds)
    const result = await users.updatePassword(idUser, hash);

    if (result.affectedRows) {
        return {
            status: 'ok',
            data: {
                message: 'Users updated successfully',
            }
        };
    } else {
        return {
            status: 'error',
            data: {
                reason: 'Error in updating users'
            }
        };
    };
}

module.exports = editPassword