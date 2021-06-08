const query = require('./db');

async function add(title, description, dateBegin, dateEnd, idAgenda) {
    const result = await query(
        `INSERT INTO events (date_begin, date_end, title, description, id_agenda)
        VALUES  (?,?,?,?,?)`,
        [
            dateBegin, dateEnd, title, description, idAgenda
        ]
    );

    if (result.affectedRows) {
        return { status: 'ok' , data : { id: result.insertId, message: 'Events created successfully'}}
    }
    return { status: 'error', data : { reason : 'Error in creating events'}} ;
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

    if (result.affectedRows) {
        return { status: 'ok', data : { message : 'Event deleted successfully'}} ;
    }
    return { status: 'error', data : { reason :'Error in deleting events' }} ;
}

async function update(idEvent, title, description, dateBegin, dateEnd, idAgenda) {
    console.log('Call of update event ', idEvent) ;
    const result = await query(
        `UPDATE events 
            SET title=?, description=?, date_begin=?, date_end=?, id_agenda=?
            WHERE id_event=?`,
        [
            title, description, dateBegin, dateEnd, idAgenda, idEvent
        ]
    );
    if (result.affectedRows) {
        return { status: 'ok', data : { message : 'Event updated successfully'}} ;
    }
    return { status: 'error', data : { reason :'Error in updating event' }} ;

}

async function getByUser(idUser) {
    console.log('Call of getByBuser with params ', idUser) ;
    const result = await query(
        `SELECT events.* FROM events
        JOIN agendaUsers
        ON events.id_agenda = agendaUsers.id_agenda
        WHERE agendaUsers.id_user= ?
        `,
        [
            idUser
        ]
    )
    return { status :'ok',data : {result} } ;
}

module.exports = {
    ...module.exports,
    getByAgenda,
    getByTitle,
    add,
    remove,
    update,
    getByUser
}