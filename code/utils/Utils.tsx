
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