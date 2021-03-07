import {
    db,
} from "./config";

import App from "./app";

const app = new App(db());

app.initialize().then(()=>{
        app.application.listen(process.env.APP_PORT, () => {
            console.log("Express application is up and running on port: " + process.env.APP_PORT);
            return;
    });
});
