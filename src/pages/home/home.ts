import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { EvtProvider } from '../../providers/evt/evt';

import { env } from '../../config/env';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers:[EvtProvider]
})
export class HomePage {

  thngId: any;

  constructor(public navCtrl: NavController, private evt: EvtProvider) {
    this.checkUserStore();
    // console.log(this.evt)
  }

  checkUserStore(){
  	/* case if user keys already exist in local storage */
  	if(typeof localStorage.evrythngUser == "undefined" || localStorage.evrythngUser == ""){
  		this.evt.createUser().then(evtUser=>{
  			localStorage.evrythngUser = evtUser.id;
  			localStorage.evrythngApiKey = evtUser.apiKey;
        this.scanThng();
        console.log('user created');

  		}).catch(err=>{
        // this.loading.dismiss();
        // this.showError();
  			//console.warn('Unable to create an anon user', err);
  		});

  	/* first load. there's no stored evt user data in localstorage */
  	}else{
      this.scanThng();
      console.log('user existing');
  	}
  }

  scanThng(){
    let self = this;

    this.evt.scanThng(env.thng).then(thng=>{
      let th = thng.json();
      console.log(th.id)
      this.evt.createAction(th.id,'_scans',{}).catch(console.warn);
    }).catch(f=>{
    });

  }

  
}
