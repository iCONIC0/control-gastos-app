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
export async function updateProfile(formData:any): Promise<{
    status: boolean;
    data: any
}> {
    let storageToken:any = await AsyncStorage.getItem('@reactNativeAuth:token');
    if(storageToken){
        let axios = GlobalAxios.getInstance();
        storageToken = JSON.parse(storageToken)
        axios.setToken(storageToken.token )
        let response = await axios.useAxios(true).post('/api/profile',formData, {
             'headers': { 
                'Authorization': `Bearer ${storageToken.token}`
            }}).then(async (resp:any) =>{ 
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
export async function incomes(params:any={}): Promise<{
    status: boolean;
    data: any
}> {
    let storageToken:any = await AsyncStorage.getItem('@reactNativeAuth:token');
    if(storageToken){
        let axios = GlobalAxios.getInstance();
        storageToken = JSON.parse(storageToken)
        axios.setToken(storageToken.token )
        let response = await axios.useAxios(true).get('/api/incomes', {
             'headers': { 'Authorization': `Bearer ${storageToken.token}` },
             'params': params
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
export async function incomesTypesList(isSelect=false): Promise<{
    status: boolean;
    data: any
}> {
    let storageToken:any = await AsyncStorage.getItem('@reactNativeAuth:token');
    if(storageToken){
        let axios = GlobalAxios.getInstance();
        storageToken = JSON.parse(storageToken)
        axios.setToken(storageToken.token )
        let response = await axios.useAxios(true).get('/api/incomes-types', {
             'headers': { 'Authorization': `Bearer ${storageToken.token}` },
             'params': {isSelect:isSelect} 
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
export async function addIncomesType(params:{
    name:string
    description:string
}): Promise<{
    status: boolean;
    data: any
}> {
    let storageToken:any = await AsyncStorage.getItem('@reactNativeAuth:token');
    if(storageToken){
        let axios = GlobalAxios.getInstance();
        storageToken = JSON.parse(storageToken)
        axios.setToken(storageToken.token )
        let response = await axios.useAxios(true).post('/api/incomes-types',params ,{
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
export async function addExpensesType(params:{
    name:string
    description:string
}): Promise<{
    status: boolean;
    data: any
}> {
    let storageToken:any = await AsyncStorage.getItem('@reactNativeAuth:token');
    if(storageToken){
        let axios = GlobalAxios.getInstance();
        storageToken = JSON.parse(storageToken)
        axios.setToken(storageToken.token )
        let response = await axios.useAxios(true).post('/api/expenses-types',params ,{
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

export async function incomesFilters():Promise<{
    status: boolean;
    data: any
}>{
    let storageToken:any = await AsyncStorage.getItem('@reactNativeAuth:token');
    if(storageToken){
        let axios = GlobalAxios.getInstance();
        storageToken = JSON.parse(storageToken)
        axios.setToken(storageToken.token )
        let response = await axios.useAxios(true).get('/api/incomes-filters', {
             'headers': { 'Authorization': `Bearer ${storageToken.token}` } 
            }).then(async (resp:any) =>{ 
            return {
                status:true,
                data:resp.data.data.select ?? []
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
export async function expenses(params:any={}): Promise<{
    status: boolean;
    data: any
}> {
    let storageToken:any = await AsyncStorage.getItem('@reactNativeAuth:token');
    if(storageToken){
        let axios = GlobalAxios.getInstance();
        storageToken = JSON.parse(storageToken)
        axios.setToken(storageToken.token )
        let response = await axios.useAxios(true).get('/api/expenses', {
                'headers': { 'Authorization': `Bearer ${storageToken.token}` },
                'params': params
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
export async function expensesTypesList(isSelect=false): Promise<{
    status: boolean;
    data: any
}> {
    let storageToken:any = await AsyncStorage.getItem('@reactNativeAuth:token');
    if(storageToken){
        let axios = GlobalAxios.getInstance();
        storageToken = JSON.parse(storageToken)
        axios.setToken(storageToken.token )
        let response = await axios.useAxios(true).get('/api/expenses-types', {
             'headers': { 'Authorization': `Bearer ${storageToken.token}` },
             'params': {isSelect:isSelect}
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
export async function addExpense(formData:{amount:number,name:string,type_id:number}): Promise<{
    status: boolean;
    data: any
}> {
    let storageToken:any = await AsyncStorage.getItem('@reactNativeAuth:token');
    if(storageToken){
        let axios = GlobalAxios.getInstance();
        storageToken = JSON.parse(storageToken)
        axios.setToken(storageToken.token )
        let response = await axios.useAxios(true).post('/api/expenses',formData, {
             'headers': { 'Authorization': `Bearer ${storageToken.token}` },
             
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
export async function expensesFilters():Promise<{
    status: boolean;
    data: any
}>{
    let storageToken:any = await AsyncStorage.getItem('@reactNativeAuth:token');
    if(storageToken){
        let axios = GlobalAxios.getInstance();
        storageToken = JSON.parse(storageToken)
        axios.setToken(storageToken.token )
        let response = await axios.useAxios(true).get('/api/expenses-filters', {
             'headers': { 'Authorization': `Bearer ${storageToken.token}` } 
            }).then(async (resp:any) =>{ 
            return {
                status:true,
                data:resp.data.data.select ?? []
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
export async function home():Promise<{
    status: boolean;
    data: any
}>{
    let storageToken:any = await AsyncStorage.getItem('@reactNativeAuth:token');
    if(storageToken){
        let axios = GlobalAxios.getInstance();
        storageToken = JSON.parse(storageToken)
        axios.setToken(storageToken.token )
        let response = await axios.useAxios(true).get('/api/home', {
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
export async function createFamily(formData:any):Promise<{
    status: boolean;
    data: any
}>{
    let storageToken:any = await AsyncStorage.getItem('@reactNativeAuth:token');
    if(storageToken){
        let axios = GlobalAxios.getInstance();
        storageToken = JSON.parse(storageToken)
        axios.setToken(storageToken.token )
        let response = await axios.useAxios(true).post('/api/family',formData, {
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
export async function leaveFamily():Promise<{
    status: boolean;
    data: any
}>{
    let storageToken:any = await AsyncStorage.getItem('@reactNativeAuth:token');
    if(storageToken){
        let axios = GlobalAxios.getInstance();
        storageToken = JSON.parse(storageToken)
        axios.setToken(storageToken.token )
        let response = await axios.useAxios(true).delete('/api/family', {
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