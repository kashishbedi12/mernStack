const server = require('ws').Server;
const ws = new server({ port: 5500 });

let onlineCount=0;
let onlineUsers=[];

ws.on('connection',async function (socket){
    console.log('home socket connected');
    onlineCount++;
    onlineUsers=[...onlineUsers,socket];
    onlineUsers.forEach((user)=>{
        user.send(JSON.stringify({type:'onlineCount',onlineCount}));
    });
    socket.on('message',async(data)=>{
        if (data instanceof Buffer) {
            data = data.toString('utf8');
        }
        data=JSON.parse(data);
        console.log('message',data);

    });
    socket.on('close',async(data)=>{
        onlineCount--;
        let t;
        onlineUsers.forEach((user)=>{
            if(user!=socket){
                user.send(JSON.stringify({type:'onlineCount',onlineCount}));
            }
            else t=user;
        });
        if(t){
            let idx=onlineUsers.indexOf(t);
            if(idx!=-1){
                onlineUsers.splice(idx, 1);
            }
            else console.log('on close user index not found');
        }
        else console.log('on close user not found');
    })
});