//referencias HTML

const lblPending=document.querySelector('#lbl-pending');


//NOTA:Uncaught (in promise) TypeError: Cannot set properties of null (setting 'innerHTML')
//Esto indica que el id de la referencia no existe en el html
//Para solucionar esto, se debe verificar que el id exista en el html


async function loadInitialCount() {
    const pending=await fetch('api/ticket/pending').then(res=>res.json());
    lblPending.innerHTML=pending.length || 0;
}



function connectToWebSockets() {

    const socket = new WebSocket( 'ws://localhost:3000/ws' );
  
    socket.onmessage = ( event ) => {
      console.log(event.data); //on-Ticket-count-changed, aca se implementa este evento del servidor wss
      const {type,payload}=JSON.parse(event.data);
      if(type!=='on-Ticket-count-changed') return;
      
      lblPending.innerHTML=JSON.parse(event.data).payload || 0;
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