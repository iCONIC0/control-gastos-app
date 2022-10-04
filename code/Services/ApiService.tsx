import AsyncStorage from '@react-native-async-storage/async-storage';
import GlobalAxios from '../utils/GlobalAxios';
import { resolverApiErrors } from '../utils/Utils';

export async function logIn(formData:{
    email:string,
    password:string
}): Promise<{
    status: boolean;
    data: any
}> {
    let axios = GlobalAxios.getInstance();
    let response = await axios.useAxios().post('/api/login',formData).then(async (resp:any) =>{         
        return {
            status:true,
            data:resp?.data?.data ?? {}
        };
      }).catch((error:any) => {
        return {
            status:false,
            data:resolverApiErrors(error.response.data)
        };
      });
    return response

}
export async function profile(): Promise<{
    status: boolean;
    data: any
}> {
    let storageToken:any = await AsyncStorage.getItem('@reactNativeAuth:token');
    if(storageToken){
        let axios = GlobalAxios.getInstance();
        storageToken = JSON.parse(storageToken)
        axios.setToken(storageToken.token )
        let response = await axios.useAxios(true).get('/api/profile', {
             'headers': { 'Authorization': `Bearer ${storageToken.token}` } 
            }).then(async (resp:any) =>{ 
            return {
                status:true,
                data:resp.data.data ?? {}
            };
        }).catch((error:any) => {
            return {
                status:false,
                data:resolverApiErrors(error.response.data)
            };
        });
        return response
    }
    return {
        status:false,
        data:null
    };

}
export async function incomes(): Promise<{
    status: boolean;
    data: any
}> {
    let storageToken:any = await AsyncStorage.getItem('@reactNativeAuth:token');
    if(storageToken){
        let axios = GlobalAxios.getInstance();
        storageToken = JSON.parse(storageToken)
        axios.setToken(storageToken.token )
        let response = await axios.useAxios(true).get('/api/incomes', {
             'headers': { 'Authorization': `Bearer ${storageToken.token}` } 
            }).then(async (resp:any) =>{ 
            return {
                status:true,
                data:resp.data.data ?? {}
            };
        }).catch((error:any) => {
            return {
                status:false,
                data:resolverApiErrors(error.response.data)
            };
        });
        return response
    }
    return {
        status:false,
        data:null
    };

}
export async function addIncomes(formData:{amount:number,name:string,type_id:number}): Promise<{
    status: boolean;
    data: any
}> {
    let storageToken:any = await AsyncStorage.getItem('@reactNativeAuth:token');
    if(storageToken){
        let axios = GlobalAxios.getInstance();
        storageToken = JSON.parse(storageToken)
        axios.setToken(storageToken.token )
        console.log(storageToken.token)
        let response = await axios.useAxios(true).post('/api/incomes',formData, {
             'headers': { 'Authorization': `Bearer ${storageToken.token}` },
             
            }).then(async (resp:any) =>{ 
            return {
                status:true,
                data:resp.data.data ?? {}
            };
        }).catch((error:any) => {
            return {
                status:false,
                data:resolverApiErrors(error.response.data)
            };
        });
        return response
    }
    return {
        status:false,
        data:null
    };

}
export async function incomesTypesList(): Promise<{
    status: boolean;
    data: any
}> {
    let storageToken:any = await AsyncStorage.getItem('@reactNativeAuth:token');
    if(storageToken){
        let axios = GlobalAxios.getInstance();
        storageToken = JSON.parse(storageToken)
        axios.setToken(storageToken.token )
        let response = await axios.useAxios(true).get('/api/incomes-types', {
             'headers': { 'Authorization': `Bearer ${storageToken.token}` } 
            }).then(async (resp:any) =>{ 
            return {
                status:true,
                data:resp.data.data ?? []
            };
        }).catch((error:any) => {
            return {
                status:false,
                data:resolverApiErrors(error.response.data)
            };
        });
        return response
    }
    return {
        status:false,
        data:null
    };

}