
//almacenar en variables los elementos del html
const currentTicketLbl=document.querySelector('span');
const createTicketBtn=document.querySelector('button');

//funciones a utilizar
async function getLastTicket() {
    const lastTicket=await fetch('/api/ticket/last').then(res=>res.json());
    currentTicketLbl.innerText=lastTicket;
    
}
async function createTicket() {
    const newTicket=await fetch('/api/ticket',{
        method:'POST',
    }).then(res=>res.json());
    currentTicketLbl.innerText=newTicket.number;
}

//llamar a la funcion getLastTicket cada vez que se recargue la pagina
getLastTicket();


//escuchar el evento click en el boton de crear ticket
createTicketBtn.addEventListener('click',createTicket); //cuando alguien haga click, se llamará al metodo