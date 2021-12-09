const express = require('express');
const app = express();
const cors = require('cors');

const routers = {
    '/auth': require('./routes/auth.routes')
};

app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(express.json());

//definicija ruta
for (const path in routers) {
    app.use(path, routers[path]);
}

//pokretanje poslužitelja na portu 5000
app.listen(5000);


