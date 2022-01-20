const express = require('express');
const app = express();
const cors = require('cors');
const path = require("path");
const { urlencoded } = require('express');
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
app.use(urlencoded({ extended: true}));

//definicija ruta
for (const path in routers) {
    app.use(path, routers[path]);
}
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "client/build")))
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname,  "./client/build/index.html"));
      });
}
app.use(express.static(path.join(__dirname, "client/build")))
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname,  "./client/build/index.html"));
      });


//pokretanje poslužitelja na portu 5000
app.listen(PORT, () => {
    console.log(`Server je na portu ` + PORT);
  });
