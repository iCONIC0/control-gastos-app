import { DateTime } from "luxon";

export const resolverApiErrors = (error:any) => {
    if(typeof(error) == 'string'){
        return error;
    }
    let messages = (error.errors ?? []).map((item:any)=>{
        let key = Object.keys(item)[0] ?? '';
        return key+' : ' + (key!='' ? item[key] : item )
    })
    return messages.join('\n');
}

export const formatMoney = (amount:number|string)=>{
    let num = typeof(amount)=='string' ? Number(amount) : amount;
    var formatter = new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
    });
    return formatter.format(num); 
}

export const formatDates = (date:string,format:string='yyyy LLL dd')=>{    
    console.log(date)
    return DateTime.fromISO(date).toFormat(format); 
}