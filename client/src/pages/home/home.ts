import { Component } from '@angular/core';
import {AlertController, ModalController, NavController} from 'ionic-angular';
import {Camera, CameraOptions} from "@ionic-native/camera";
import {ApiProvider} from "../../providers/api/api";
import {ModalResultPage} from "../modal-result/modal-result";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  pictureData:string;
  data:string;
  type:string;

  constructor(public navCtrl: NavController,
              private camera:Camera,
              private api:ApiProvider,
              private alert:AlertController,
              private modal:ModalController) {

  }


  takePicture(){

    const cameraOptions: CameraOptions = {
      quality: 60,
      targetWidth: 2480 / 2,
      targetHeight: 3508 / 2,
      correctOrientation: true,
      allowEdit: true,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.type = 'jpg';

    this.camera.getPicture(cameraOptions).then(
      (imageData: string) => {
        this.pictureData = 'data:image/png;base64,'+imageData
        this.data = imageData;
      },
        err => {
        this.alert.create({
          title:'Erreur',
          message:err.message,
          buttons:['Ok']
        }).present()
        console.error(err)
      });

  }


  deletePicture(){
    this.pictureData = null;
    this.data = null;
    this.type = null;
  }


  uploadPicture(){
    this.api.uploadPicture$(this.data,this.type).subscribe(
      res => {
        
        if(!res.success){
          this.alert.create({
            title:'Success',
            message:'Picture sent',
            buttons:['Ok']
          }).present()
          console.log(res)
        }else{
          this.modal.create(ModalResultPage,{data:res.data,type:res.type}).present()
        }

      },
        err => {
          this.alert.create({
            title:'Erreur',
            message:err.message,
            buttons:['Ok']
          }).present()
          console.error(err)
        }
    )
  }
}
