import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import { env } from "../../config/env";

declare var EVT: any;

/*
  Generated class for the EvtProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EvtProvider {

  evtApp: any;
  evtUser: any;

  constructor(public http: Http) {
    console.log('evt service');
    // console.log(EVT.);
    EVT.setup({
      geolocation:true
    });
    this.evtApp = new EVT.App(env.evtApiKey);

  }

  createUser(){
  	this.evtApp = new EVT.App(env.evtApiKey);
  	return this.evtApp.appUser().create({
      anonymous:true
    });
  }

  scanThng(id:string){
  	/*return this.getUserContext().then(user=>{
      return user.$init.then(usr=>{
        return usr.thng(id).read();
      }).catch(console.info);
    }).catch(console.info);*/
    let hdr = new Headers;
    let rqo = new RequestOptions;
    hdr.append('Authorization',localStorage.evrythngApiKey);
    rqo.headers = hdr;
    let url = 'https://api.evrythng.com/products/'+id;

    return this.http.get(url,rqo).toPromise();

  }

  createAction(th:string,name:string,fields:{} = {}){
    let hdr = new Headers;
    let rqo = new RequestOptions;
    hdr.append('Authorization',localStorage.evrythngApiKey);
    hdr.append('Content-Type',"application/json");
    rqo.headers = hdr;
    let url = 'https://api.evrythng.com/actions/'+name;

    let f = JSON.stringify(fields);
    let body = `{
    	"thng":"${th}",
    	"type":"${name}",
    	"customFields":${f}
    }`;

    return this.http.post(url,body,rqo).toPromise();

  }

}
