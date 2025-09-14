# Redis-req-res 
  In this folder :
      redisClient.js : 
          * In this file we can connect to Redis.
      Server.js : 
          * we got a post req /fetch-data and we are sending it to the redis "requestqueue" named queue to do the task because we dont want our main server to take the load.
          * and it polls the "response:id" queue to get the response back to the client for 5 seconds if not it throws an error.
      Worker.js : 
          * It wii take the data from queue and proccess it and sends response back to the "response:id" queue. from there it go to the client.

      ( This is how Leetcode Problem Submission works in the backend)

      <img width="672" height="403" alt="image" src="https://github.com/user-attachments/assets/3966e7f9-18d8-4bd3-bb01-9696813bbc8d" />
