// Code thay Le Trong Dat
const jsonServer = require("json-server");
const auth = require("json-server-auth");
const path = require("path");
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults({
    noCors: false,
});
server.db = router.db;

const rules = auth.rewriter({
    // Permission rules
    // users: 600,
    // messages: 640
});

// You must apply the middlewares in the following order
server.use(rules);
server.use(auth);

server.use(middlewares);
server.use((req, res, next) => {

    if (req.method === "POST") {
        req.body.createAt = Date.now();
        req.body.updateAt = Date.now();
    } else if (req.method === "PATCH") {
        req.body.updateAt = Date.now();
    }
    next();
});

server.use("/api", router);
server.listen(8080, () => {
    console.log("JSON Server is running");
});


// // Code Nguyen Quang Truong
// const jsonServer = require('json-server')
// const auth = require('json-server-auth')
// const cors = require('cors')
// const path = require('path')
// const server = jsonServer.create()
// const router = jsonServer.router(path.join(__dirname, 'db.json'))
//     // const middlewares = jsonServer.defaults({
//     //   noCors: true,
//     // })
// server.db = router.db

// const rules = auth.rewriter({
//     // Permission rules
//     // users: 600,
//     // messages: 640
// })

// // You must apply the middlewares in the following order
// server.use(cors())
// server.use(rules)
// server.use(auth)
// server.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', 'https://bee-navy.vercel.app')
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
//     res.setHeader('Access-Control-Allow-Headers', '*')
//     res.setHeader('Access-Control-Allow-Credentials', true)
//     if (req.method === 'POST') {
//         req.body.createAt = Date.now()
//         req.body.updateAt = Date.now()
//     } else if (req.method === 'PATCH') {
//         req.body.updateAt = Date.now()
//     }
//     next()
// })

// server.use('/api', router)
// server.listen(8080, () => {
//     console.log('JSON Server is running')
// })