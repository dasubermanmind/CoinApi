import {
    db,
} from "./config";

import App, { Iresults } from "./app";

const app = new App(db());

app.initialize().then((datum: Iresults)=>{
    console.log(1);
    if(datum.success){
        app.application.listen(process.env.APP_PORT, () => {
            console.log("Express application is up and running on port: " + process.env.APP_PORT);
            return;
        });
    }else{
        process.exit(1);
    }
});
