export interface Ticket {
    id:string;
    number:number; //numero del ticket
    createdAt:Date;
    handleAtDesk?:string; //Escritorio 1,2,3
    handleAt?:Date; //Fecha de atencion
    done:boolean; //si ya fue atendido

}