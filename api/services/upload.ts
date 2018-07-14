import {NextFunction, Request, Response} from "express";

const newGUID = function () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};

export const postPicture = function (req: Request, res: Response, next: NextFunction) {
    const base64Data = req.body.data;
    const type = req.body.type;
    const name = req.body.name;

    if (!base64Data || !type) {
        return res.json({error: 'you made a mistake'})
    }

    if (type !== 'jpeg'
        && type !== 'jpg'
        && type !== 'gif'
        && type !== 'png') {
        return res.json({error: 'you made a mistake'})
    }

    require("fs")
        .writeFile("./images/" + newGUID()+ "-" + name + "." + type, base64Data, 'base64', error =>{
      if(error){
          res.json({success:false,error})
      } else{
          const bitmap = require('fs').readFileSync("./responses/response.jpg");
          const data = new Buffer(bitmap).toString('base64');
          return res.json({success:true, data, type:'jpg'})
      }
    })


};