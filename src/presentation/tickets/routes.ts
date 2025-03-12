import { Router } from "express";
import { TicketController } from "./controller";

export class TicketRoutes
{
    static get routes()
    {

        //NOTA: al definir rutas, siempre deben comenzar con /, de lo contrario no funcionara
        //EJEMPLO: router.get('draw/:desk)========>INCORRECTO, devolverá 404
        const router = Router();
        const ticketController = new TicketController();
        router.get('/',ticketController.getTickets);
        router.get('/last',ticketController.getLastTicketNumber);
        router.get('/pending',ticketController.pedingTickets);

        router.post('/',ticketController.createTicket);

        router.get('/draw/:desk',ticketController.drawTicket); //toma un ticker y lo asigna automaticamente a un escritorio
        router.put('/done/:ticketId',ticketController.ticketFinished);

        router.get('working-on',ticketController.workingOn);
        return router;
    }
}