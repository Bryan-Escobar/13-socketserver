//referencias HTML

const lblPending=document.querySelector('#lbl-pending');
const deskHeader=document.querySelector('h1'); //retorna el primer h1 que encuentre
const noMoreAlert=document.querySelector('.alert');

const searchParams=new URLSearchParams(window.location.search);
if(!searchParams.has('escritorio')) 
    {
        window.location='index.html';
        throw new Error('El escritorio es obligatorio');
    }
const deskNumber=searchParams.get('escritorio');
deskHeader.innerText=deskNumber;

function checkTicketCount(currentCount=0)
{
    console.log("currentCount",currentCount);
    if(currentCount===0)
    {
        noMoreAlert.classList.remove('d-none'); //muestra la alerta
    }
    else{
        noMoreAlert.classList.add('d-none'); //oculta la alerta
    }

    lblPending.innerHTML=currentCount;
}

//NOTA:Uncaught (in promise) TypeError: Cannot set properties of null (setting 'innerHTML')
//Esto indica que el id de la referencia no existe en el html
//Para solucionar esto, se debe verificar que el id exista en el html


async function loadInitialCount() {
    const pendingTickets=await fetch('api/ticket/pending').then(res=>res.json());
    // lblPending.innerHTML=pending.length || 0;

    checkTicketCount(pendingTickets.length);
}



function connectToWebSockets() {

    const socket = new WebSocket( 'ws://localhost:3000/ws' );
  
    socket.onmessage = ( event ) => {
      console.log(event.data); //on-Ticket-count-changed, aca se implementa este evento del servidor wss
      const {type,payload}=JSON.parse(event.data);
      if(type!=='on-ticket-count-changed') return; //el type debe ser el mismo que el enviado por el server, sino no hace nada

    //   lblPending.innerHTML=JSON.parse(event.data).payload || 0;
    console.log("recibio mensaje")
    checkTicketCount(payload);

    };
  
    socket.onclose = ( event ) => {
      console.log( 'Connection closed' );
      setTimeout( () => {
        console.log( 'retrying to connect' );
        connectToWebSockets();
      }, 1500 );
  
    };
  
    socket.onopen = ( event ) => {
      console.log( 'Connected' );
    };
  
  }
  




  connectToWebSockets();
  loadInitialCount();