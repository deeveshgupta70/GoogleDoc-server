import {Server} from 'socket.io';
import Connection from './database/db.js';
import { getDocument, updateDocument } from './controller/documentController.js';
import dotenv from 'dotenv';

dotenv.config();

Connection();

const io = new Server(process.env.PORT,{
    cors:{
        origin:`*`,
        methods:['GET' , 'POST'],
    }
});


io.on('connection' , socket=>{

    socket.on('get-document',async documentID =>{

        const document = await getDocument(documentID);
        socket.join(documentID);
        socket.emit('load-document' , document.data);

        socket.on('send-changes',delta =>{
            socket.broadcast.to(documentID).emit('receive-changes' , delta);
        })

        socket.on('save-document' , async data =>{
            await updateDocument(documentID , data);
        })
    })

});

