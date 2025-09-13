const express = require('express');
const {v4} =  require('uuid');
const client = require("./redisClient");


const app = express();
app.use(express.json());

//endpoint client requests data
app.post("/fetch-data", async (req, res) => {
    const correlationId = v4();
    const reqData = {correlationId, payload : req.body};

    // Push job into Redis Request Queue
    await client.lPush("requestQueue", JSON.stringify(reqData));

    //Listen for response in Response Queue
    const timeout = 5000;
    const start = Date.now();

    while(Date.now() - start < timeout){
        const result = await client.brPop(`response:${correlationId}`, 1);

        if(result){
            const responseData = JSON.parse(result.element);
            return res.json({success : true, data : responseData});
        }
    }
    res.status(504).json({success : false, message : "timeout for waiting response"});
})

app.listen(5000, () => {
    console.log("Main Server running at PORT : 5000");
});