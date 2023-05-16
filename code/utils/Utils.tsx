import { DateTime } from "luxon";

export const resolverApiErrors = (error:any) => {
    if(typeof(error) == 'string'){
        return error;
    }
    let messages = (error?.errors ?? []).map((item:any)=>{
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
    return DateTime.fromISO(date).toFormat(format); 
}
export const onlyNumber = (text:string)=>{    
    const condition = new RegExp(/^[0-9]+\.?[0-9]*$/,"g");
    if (condition.test(text) || text.length == 0) {
        return text.substr(1);
    }
}
export const maskInput = (text:string,mask:string,maskDelimiter:string)=>{    
    let maskArray = mask.split(maskDelimiter)
    let maxText = maskArray.reduce((a,b)=>a+b.length,0)
    let tmpText = text.replaceAll(maskDelimiter,'')
    if(tmpText.length>maxText){
        return text.substr(0,text.length-1);
    }
    let newText = ''

    let index = 0;
    for (let i = 0; i < maskArray.length; i++) {
        const element = maskArray[i];
        let tmp = tmpText.substr(index,element.length)
        newText += maskArray.length-1==i ? tmp : tmp+maskDelimiter
        index += element.length
    }
    return newText;
}