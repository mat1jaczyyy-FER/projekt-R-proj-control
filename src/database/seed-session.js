const db = require('.')

const sql_create_sessions = `CREATE TABLE session (
    sid varchar NOT NULL COLLATE "default",
    sess json NOT NULL,
    expire timestamp(6) NOT NULL
  )
  WITH (OIDS=FALSE);`

const sql_create_session_index1 = `ALTER TABLE session ADD CONSTRAINT session_pkey PRIMARY KEY (sid) NOT DEFERRABLE INITIALLY IMMEDIATE`
const sql_create_session_index2 = `CREATE INDEX IDX_session_expire ON session(expire)`

let table_names = [
    "sessions"
]

let tables = [
    sql_create_sessions
];

let table_data = [
    undefined
]

let indexes = [
    sql_create_session_index1,
    sql_create_session_index2
];

if ((tables.length != table_data.length) || (tables.length != table_names.length)) {
    console.log("tables, names and data arrays length mismatch.")
    return
}

//create tables and populate with data (if provided) 

(async () => {
    console.log("Creating and populating tables");
    for (let i = 0; i < tables.length; i++) {
        console.log("Creating table " + table_names[i] + ".");
        try {
            await db.pool.query(tables[i], [])
            console.log("Table " + table_names[i] + " created.");
            if (table_data[i] !== undefined) {
                try {
                    await db.pool.query(table_data[i], [])
                    console.log("Table " + table_names[i] + " populated with data.");
                } catch (err) {
                    console.log("Error populating table " + table_names[i] + " with data.")
                    return console.log(err.message);
                }
            }
        } catch (err) {
            console.log("Error creating table " + table_names[i])
            return console.log(err.message);
        }
    }

    console.log("Creating indexes");
    for (let i = 0; i < indexes.length; i++) {
        try {
            await db.pool.query(indexes[i], [])
            console.log("Index " + i + " created.")
        } catch (err) {
            console.log("Error creating index " + i + ".")
        }
    }
})()
