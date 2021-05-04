const express = require('express')
var cors = require('cors')
const {socketController} = require("../sockets/controller");




class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server);
        this.paths = {

        }

        // Middlewares
        this.middlewares()
        //Rutas de mi app
        this.routes()

        //sockets
        this.sockets();

    }

    middlewares() {
        //cors
        this.app.use(cors())

        // drirectorio publico
        this.app.use(express.static('public'))

    }

    routes() {
        //this.app.use(this.paths.authPath, require('../routes/auth'))

    }

    sockets(){
        this.io.on('connection', socketController)
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log('Servidor corriendo en', process.env.PORT)
        })
    }
}


module.exports = Server