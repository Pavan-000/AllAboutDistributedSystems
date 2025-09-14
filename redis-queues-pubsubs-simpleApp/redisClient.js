const { createClient } = require('redis');

const client = createClient({
    socket : {
        host: "127.0.0.1", 
        port: 6379
    },
    //password : 
})

client.on('error', (err) => console.log('Redis Error : ', err));

(async () => {
    client.connect(),
    console.log("Redis Connected and listending at port : 6379");
})

module.exports = {client};