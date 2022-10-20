import axios from "axios";
import { AXIOS_URL,API_KEY,API_PASSWORD } from "@env" 

export default class GlobalAxios {

    static instance:null|GlobalAxios = null;
    private token:string|null = null;
    private axiosTool:any;
    
    /**
     * @returns {GlobalAxios}
     */
    static getInstance() {
        if (GlobalAxios.instance == null) {
            GlobalAxios.instance = new GlobalAxios();
            GlobalAxios.instance.axiosTool = axios;
        }

        return GlobalAxios.instance;
    }
    public useAxios(needToken:boolean = false) {
        let config:any=null;
        if(needToken){
            config = {
                headers: {
                    'API-AUTH-TOKEN': API_KEY,
                    'API-AUTH-USER': API_PASSWORD,
                    'Authorization': `Bearer ${this.token}`
                }
            }
        }else{
            config = {
                headers: {
                    'API-AUTH-TOKEN': API_KEY,
                    'API-AUTH-USER': API_PASSWORD
                }
            }
        }
        return this.axiosTool.create({
            baseURL: AXIOS_URL,
            config
        });
    }  
    public setToken(token:string) {
        this.token = token;
    }
    public getToken() {
        return this.token;
    }
}