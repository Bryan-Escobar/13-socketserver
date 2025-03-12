import { Router } from "express";
import { TicketController } from "./controller";

export class TicketRoutes
{
    static get routes()
    {
        const router = Router();
        const ticketController = new TicketController();
        router.get('/',ticketController.getTickets);
        router.get('/last',ticketController.getLastTicketNumber);
        router.get('/pending',ticketController.pedingTickets);

        router.post('/',ticketController.createTicket);

        router.get('draw/:desk',ticketController.drawTIcket); //toma un ticker y lo asigna automaticamente a un escritorio
        router.put('/done/:ticketId',ticketController.ticketFinished);

        router.get('working-on',ticketController.workingOn);
        return router;
    }
}