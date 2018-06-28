import {Component, OnInit} from '@angular/core';
import {NavParams, ViewController} from 'ionic-angular';


@Component({
  selector: 'page-modal-result',
  templateUrl: 'modal-result.html',
})
export class ModalResultPage implements OnInit{

  pictureData = null;

  constructor(public viewCtrl: ViewController, public navParams: NavParams) {
  }

  ngOnInit() {
    const data = this.navParams.get('data');
    const type = this.navParams.get('type');
    if(type==='jpg' || type==='jpeg'){
      this.pictureData = 'data:image/jpg;base64,'+data;
    }else{
      //TODO
      console.error('TODO')
    }
  }

  dismiss() {
    this.viewCtrl.dismiss({});
  }

}
