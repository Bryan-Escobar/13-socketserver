import { createServer } from 'http';
import { envs } from './config/envs';
import { AppRoutes } from './presentation/routes';
import { Server } from './presentation/server';
import { WssService } from './presentation/services/wss.service';


(async()=> {
  main();
})();


function main() {

  const server = new Server({
    port: envs.PORT,
  });
  const httpServer=createServer(server.app); //el servidor http tendra las mismas configuraciones que el servidor de express
  WssService.initWss({server:httpServer});
  httpServer.listen(envs.PORT, () => {
    console.log(`Server running on port ${envs.PORT}`);
  });
  server.setRoutes(AppRoutes.routes);
  // server.start();
}