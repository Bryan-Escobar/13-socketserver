import { Request, Response } from "express";

export class TicketController {
    // DI
    constructor() {

    }

    public getTickets = async (req: Request, res: Response) => {
        res.json({ message: 'getTickets' });
    }
    public getLastTicketNumber = async (req: Request, res: Response) => {
        res.json({ message: 'getLastTicket number' });
    }
    public pedingTickets = async (req: Request, res: Response) => {
        res.json({ message: 'get peding tickets' });
    }
    public createTicket = async (req: Request, res: Response) => {
        res.json({ message: 'create ticket' });
    }
    public drawTIcket = async (req: Request, res: Response) => {
        res.json({ message: 'draw ticket' });
    }
    public ticketFinished = async (req: Request, res: Response) => {
        res.json({ message: 'tickets finished' });
    }
    public workingOn = async (req: Request, res: Response) => {
        res.json({ message: 'get working on' });
    }
}