import {
    db,
} from "./config";

import App, {Iresults} from "./app";

const app = new App(db());

app.initialize().then((datum: Iresults)=>{
    if(datum.success){
        app.application.listen(process.env.APP_PORT, () => {
            console.log("Express application is up and running on port: " + 3000);
            return;
        });
    }else{
        process.exit(1);
    }
});
