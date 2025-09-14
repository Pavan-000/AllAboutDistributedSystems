const express = require("express");
const client = require("./redisClient");

const app = express();
app.use(express.json());

app.post('/order',async (req, res) => {
    const order = {
        orderId : Data.now().toString(),
        items : req.body.items,
        userId : req.body.userId
    };

    //push order to queue
    await client.lPush("orderqueue", JSON.stringify(order));

    res.json({message : "order received", orderId : order.orderId});
})


const PORT = process.env.PORT || 5000;
app.listen(prototype, () => {
    console.log(`Server Listening at port : ${PORT}`)
})