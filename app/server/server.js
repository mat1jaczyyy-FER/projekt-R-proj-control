const express = require('express');
const app = express();
const path = require('path');
const db = require('./database')
const session = require('express-session')
const pgSession = require('connect-pg-simple')(session)

const routers = {
    '/': require('./routes/home.routes'),
    '/signup': require('./routes/signup.routes'),
    '/login': require('./routes/login.routes'),
    '/logout': require('./routes/logout.routes')
 }

//middleware - predlošci (jsx/react)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine())

//middleware - statički resursi
app.use(express.static(path.join(__dirname, 'public')));

//middleware - dekodiranje parametara
app.use(express.urlencoded({ extended: true }));

//pohrana sjednica u postgres bazu
app.use(session({
    cookie: { maxAge: 1000 * 86400 }, // 1000 dana
    saveUninitialized: true,
    secret: 'proj-control',
    store: new pgSession({pool: db.pool}),
    resave: false,
}));

//definicija ruta
for (const path in routers) {
    app.use(path, routers[path]);
}

//pokretanje poslužitelja na portu 3000
app.listen(3000);


