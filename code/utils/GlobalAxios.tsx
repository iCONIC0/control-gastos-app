import React from "react";
import axios from "axios";

const AXIOS_URL = "http://192.168.4.39:3355";

export default class GlobalAxios {

    static instance:null|GlobalAxios = null;
    private token:string|null = null;
    private API_KEY:string = "YOUR_API_KEY";
    private API_PASSWORD:string = "YOUR_API_PASSWORD";
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
                    'API-AUTH-TOKEN': this.API_KEY,
                    'API-AUTH-USER': this.API_PASSWORD,
                    'Authorization': `Bearer ${this.token}`
                }
            }
        }else{
            config = {
                headers: {
                    'API-AUTH-TOKEN': this.API_KEY,
                    'API-AUTH-USER': this.API_PASSWORD
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