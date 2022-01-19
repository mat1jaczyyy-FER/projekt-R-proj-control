const express = require('express');
const app = express();
const cors = require('cors');
const path = require("path");
const PORT = process.env.PORT || 5000;
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

app.use(cors());
app.use(express.json());
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "client/build")))
}

//definicija ruta
for (const path in routers) {
    app.use(path, routers[path]);
}

//pokretanje poslužitelja na portu 5000
app.listen(PORT, () => {
    console.log(`Server radi woohooo`);
  });
