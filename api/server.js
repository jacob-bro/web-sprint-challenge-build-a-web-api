require('dotenv').config()

const express = require('express')
const actionsRouter = require("./actions/actions-router.js")
const projectsRouter = require("./projects/projects-router.js")
const server = express()

server.use(express.json());
server.use("/api/actions",actionsRouter)
server.use("/api/projects",projectsRouter)

const PORT = process.env.PORT || 9000

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

module.exports = server;
