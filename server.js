const express = require('express');
const app = express();
const cors = require('cors');
//const process = require('dotenv').config()

const routers = {
    '/auth': require('./routes/auth.routes'),
    '/project': require('./routes/project.routes'),
    '/task': require('./routes/task.routes'),
    '/role': require('./routes/roles.routes'),
    '/status': require('./routes/status.routes'),
    '/taskpriority': require('./routes/taskpriority.routes'),
    '/tasktype': require('./routes/tasktype.routes'),
    '/user': require('./routes/user.routes')
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
app.listen(5000, () => {
    console.log(`Server radi woohooo`);
  });
