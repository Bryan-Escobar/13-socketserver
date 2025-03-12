import { Server } from 'http';
import { WebSocketServer,WebSocket } from 'ws';
interface Options{
    server:Server;
    path?:string;
}
//este es un singleton, es decir que solo puede haber una instancia de esta clase
export class WssService
{
    private static _instance: WssService; //el guion bajo indica que es privado
    private wss:WebSocketServer;
    private constructor(options:Options){ //el constructor es privado pues la clase no debe poder ser instanciada desde fuera mediante el, sino desde el interior
        const {server,path='/ws'}=options; /// loclahost:3000/ws
        this.wss= new WebSocketServer({server,path});
        this.start();
        
    }
    static get instance():WssService{
        if(!WssService._instance){
            throw 'WssService is not initialized';
        }
        return WssService._instance;
    }
    static initWss(options:Options) //este metodo se llama para inicializar el singleton, para instanciar la clase
    {
        WssService._instance=new WssService(options);
    }
    public start()
    {
        this.wss.on('connection',(ws:WebSocket)=>{
            console.log('Client connected');
            ws.on('close',()=>{
                console.log('Client disconnected');
            })
        })
    }
}