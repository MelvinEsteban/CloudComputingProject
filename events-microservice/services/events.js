const query = require('./db');

async function add(title, description, dateBegin, dateEnd, idAgenda) {
    const result = await query(
        `INSERT INTO events (date_begin, date_end, title, description, id_agenda)
        VALUES  (?,?,?,?,?)`,
        [
            dateBegin, dateEnd, title, description, idAgenda
        ]
    );

    let message = 'Error in creating events';

    if (result.affectedRows) {
        message = 'Events created successfully';
    }
    return {
        message
    };
}

async function getByTitle(title) {
    const result = await query(
        `SELECT * FROM events WHERE title=?`,
        [
            title
        ]
    );

    let message = 'Error no events named ' + title;
    let data = [];
    if (result.length > 0) {
        data = result;
        message = 'GET SUCCESS';
    }

    return {
        message,
        data
    };
}

async function getByAgenda(idAgenda) {
    const result = await query(
        `SELECT * FROM events WHERE id_agenda=?`,
        [
            idAgenda
        ]
    );

    let message = 'Error no events assigned to the schedule : ' + idAgenda;
    let data = [];
    if (result.length > 0) {
        data = result;
        message = 'GET SUCCESS';
    }

    return {
        message,
        data
    };

}




async function remove(id) {
    const result = await query(
        `DELETE FROM events WHERE id_event=?`,
        [id]
    );

    let message = 'Error in deleting events';

    if (result.affectedRows) {
        message = 'Agenda deleted successfully';
    }

    return {
        message
    };
}


async function update(idEvent, title, description, dateBegin, dateEnd, idAgenda) {
    const result = await query(
        `UPDATE events 
            SET title=?, description=?, date_begin=?, date_end=?, id_agenda=?
            WHERE id_event=?`,
        [
            title, description, dateBegin, dateEnd, idAgenda, idEvent
        ]
    );

    let message = 'Error in updating event';

    if (result.affectedRows) {
        message = 'Event updated successfully';
    }

    return {
        message
    };
}

module.exports = {
    ...module.exports,
    getByAgenda,
    getByTitle,
    add,
    remove,
    update
}