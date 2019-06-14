const fs = require('fs');

export const getDB = (name, cb) => {
    return fs.readFile(__dirname + `/${name}.json`, 'utf-8', (err, data) => {
        if (err) throw err
        const db = JSON.parse(data);
        return cb(db);
    });
}

export const saveDB = async (name, data) => {
    db = JSON.stringify(db, null, '\t');
    return fs.writeFile(__dirname + `/${name}.json`, data, 'utf-8', (err, data) => {
        if (err) throw err
        return true;
    });
}