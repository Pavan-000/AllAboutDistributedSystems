const { createClient } = require("redis");

const client = createClient({
    socket: {
        host: "127.0.0.1", // or your Redis host
        port: 6379
    },
    // password: "your_redis_password" // if needed
});

client.on("error", (err) => console.log("Redis error: ", err));

(async () => {
    await client.connect();
    console.log("Redis connected! at 6379");
})();

module.exports = client;
