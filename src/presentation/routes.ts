import { Router } from 'express';
import { TicketRoutes } from './tickets/routes';




export class AppRoutes {


  static get routes(): Router {

    const router = Router();
    router.use('/api/ticket',TicketRoutes.routes);
    // Definir las rutas
    // router.use('/api/todos', /*TodoRoutes.routes */ );



    return router;
  }


}

