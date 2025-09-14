const client = require("./redisClient");

const startworker = async () => {
    console.log("Worker Started....");

    while(true){
        const job = await client.brPop("orderqueue", 0);
        if(job){
            const order = JSON.parse(job.element);

            console.log("Proccessing the payment for the order...");

            //simulate the payment
            const result = {status : 'success', orderId : order.orderId};

            // Publish the event 
            await client.publish("payment:success", JSON.stringify(result));
        }
    }
}
startworker();