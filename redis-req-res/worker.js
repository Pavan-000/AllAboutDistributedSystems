9
const client = require("./redisClient");

//Worker keeps listening for jobs 
async function startWorker(){
    console.log("Worker Started");

    while(true){
        const job = await client.brPop('requestQueue', 0); // Blocking pop
        if(job){
            const reqData = JSON.parse(job.element);
            const {correlationId, payload} = reqData;

            console.log("Worker Proccessing..", payload);

            // Simulate DB query 
            const result = {message : "Data fetched succesfully", query : payload};

            //Push data into response queue with corellationId
            await client.lPush(`response:${correlationId}`, JSON.stringify(result));
        }
    }
}
startWorker();