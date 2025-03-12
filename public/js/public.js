function renderTickets(tickets=[]) {
    for (let i = 0; i < tickets.length; i++) {
        if(i>=4)
        {
            console.log('Maximo de tickets saliendo');
            break;
        }
        const ticket=tickets[i];
        if(!ticket) continue;
        const lblTicket=document.querySelector(`#lbl-ticket-0${i+1}`)
        const lblDesk=document.querySelector(`#lbl-desk-0${i+1}`)

        lblTicket.innerText='Ticket '+ticket.number;
        lblDesk.innerText=ticket.handleAtDesk;
    }
}



async function loadCurrentTickets() {
    const tickets=await fetch('/api/ticket/working-on')
    .then(response=>response.json())
    // console.log(tickets);
    renderTickets(tickets);
}


function connectToWebSockets() {

    const socket = new WebSocket( 'ws://localhost:3000/ws' );
  
    socket.onmessage = ( event ) => {
        const {type,payload}=JSON.parse(event.data);
        if(type!=='on-working-changed') return; //el type debe ser el mismo que el enviado por el server, sino no hace nada
          
        renderTickets(payload);
  
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







loadCurrentTickets();
connectToWebSockets();




