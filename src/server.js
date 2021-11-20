//uvoz modula
const express = require('express');
const app = express();
const path = require('path');
const db = require('./db')
const session = require('express-session')
const pgSession = require('connect-pg-simple')(session)

//uvoz modula s definiranom funkcionalnosti ruta
const routers = {
    '/': require('./routes/home.routes')
    //'/login': require('./routes/login.routes'),
    //'/logout': require('./routes/logout.routes')
}

//middleware - predlošci (ejs)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine())

//middleware - statički resursi
app.use(express.static(path.join(__dirname, 'public')));

//middleware - dekodiranje parametara
app.use(express.urlencoded({ extended: true }));

//middleware - session
app.use(session({
    cookie: { maxAge: 1000 * 86400 }, // 1000 dana
    resave: false,
    saveUninitialized: true,
    secret: 'proj-control',
    store: new pgSession({ pool: db.pool }),
}));

//definicija ruta
for (const path in routers) {
    app.use(path, routers[path]);
}

//pokretanje poslužitelja na portu 3000
app.listen(3000);

