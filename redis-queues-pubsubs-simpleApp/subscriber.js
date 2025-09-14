const client = require("./redisClient");

const startSubscriber = async() => {
    console.log("Notification Service started....");

    await client.subscribe("payment:success", (message) => {
        const event = JSON.parse(message);

        console.log(`Notify user that Payment Successful for order ${event.orderId}`);
    });
};

startSubscriber();