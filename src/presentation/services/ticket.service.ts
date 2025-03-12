import { UuidAdapter } from "../../config/uuid.adapter";
import { Ticket } from "../../domain/interfaces/ticket";
import { WssService } from "./wss.service";

export class TicketService
{
    public readonly tickets: Ticket[] = [
        { id: UuidAdapter.v4(), number: 1, createdAt: new Date(), done: false },
        { id: UuidAdapter.v4(), number: 2, createdAt: new Date(), done: false },
        { id: UuidAdapter.v4(), number: 3, createdAt: new Date(), done: false },
        { id: UuidAdapter.v4(), number: 4, createdAt: new Date(), done: false },
        { id: UuidAdapter.v4(), number: 5, createdAt: new Date(), done: false },
    ];
    constructor(private readonly wssService=WssService.instance //singleton

    )
    {}

    private readonly workingOnTickets:Ticket[]=[];


    public get pendingTickets(): Ticket[]
    {
        return this.tickets.filter(ticket=>!ticket.handleAtDesk)
    }

    public get lastWorkingOnTickets():Ticket[]
    {
        return this.workingOnTickets.splice(0,4); //trae los primeros 4 elementos
        //esto se hace, ya que los nuevos tickes en el array workingOnTickets se van añadiendo al principio, se van apilando
    }

    public get lastTicketNumber():number
    {
        return this.tickets.length > 0 ? this.tickets.at(-1)?.number ?? 0 : 0; //trae el ultimo elemento
    }
    public createTicket():Ticket
    {
        const ticket:Ticket={id:UuidAdapter.v4(),number:(this.tickets.length+1),createdAt:new Date(),done:false};
        this.tickets.push(ticket);
        this.onTicketNumberChnged();
        return ticket;


    }
    public drawTicket(desk:string)
    {
        const ticket=this.tickets.find(t=>!t.handleAtDesk); //retorna el primer ticket que cumpla con dicha condicion
        if(!ticket) return {status:'error',message:'No hay tickets pendientes'};
        ticket.handleAtDesk=desk;
        ticket.handleAt=new Date();
        
        this.workingOnTickets.unshift({...ticket}); //añade el ticket al principio del array

        // this.workingOnTickets.push(ticket); //añade el ticket al final del array

        //Todo: Ws para notificar a los clientes que el ticket fue atendido
        return {status:'ok',ticket};
    }

    public onFinishedTicket(id:string)
    {
        const ticket=this.tickets.find(t=>t.id===id);
        if(!ticket) return {status:'error',message:'Ticket no encontrado'};
        this.tickets.map(ticket=>{
            if(ticket.id===id)
            {
                ticket.done=true;
            }
            return ticket;
        })
        return {status:'ok'};
    }

    private onTicketNumberChnged() //envia la cantidad de tickets pendientes
    {
        console.log('onTicketNumberChnged en el lado del servidor');
        this.wssService.sendMessage('on-ticket-count-changed',this.pendingTickets.length);
    }
}