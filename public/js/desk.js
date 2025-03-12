//referencias HTML

const lblPending=document.querySelector('#lbl-pending');
const deskHeader=document.querySelector('h1'); //retorna el primer h1 que encuentre
const noMoreAlert=document.querySelector('.alert');
const btnDraw=document.querySelector('#btn-draw');
const btnDone=document.querySelector('#btn-done');
const lblCurrentTicket=document.querySelector('small'); //small donde se mostrará el error

const searchParams=new URLSearchParams(window.location.search);
if(!searchParams.has('escritorio')) 
    {
        window.location='index.html';
        throw new Error('El escritorio es obligatorio');
    }
const deskNumber=searchParams.get('escritorio');
let workingTicket=null; //ticket en el que se está trabajando
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
//ademas puede se causado por poner el endpoint mal en el fetch

async function loadInitialCount() {
    const pendingTickets=await fetch('api/ticket/pending').then(res=>res.json());
    // lblPending.innerHTML=pending.length || 0;

    checkTicketCount(pendingTickets.length);
}

async function getTicket () {
    await finishTicket();
    const {status,ticket,message}=await fetch('/api/ticket/draw/'+deskNumber)
    .then(res=>res.json());

    if(status==='error')
    {
        lblCurrentTicket.innerText=message;
        return;
    }
    workingTicket=ticket;
    lblCurrentTicket.innerText=ticket.number;
}

async function finishTicket() {
  if(!workingTicket)
  {
    console.log("No hay ticket");
    return;
  }
  const {status,message}=await fetch('/api/ticket/done/'+workingTicket.id,
    {
      method:'PUT',
    })
    .then(res=>res.json());
    console.log(status,message);
    if(status==='ok')
    {
      workingTicket=null;
      lblCurrentTicket.innerText='Nadie';
    }
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
  
//Listeners
  btnDraw.addEventListener('click',getTicket);

  btnDone.addEventListener('click',finishTicket);

  connectToWebSockets();
  loadInitialCount();