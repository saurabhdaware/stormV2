import { Injectable } from '@angular/core';

@Injectable()
export class ControllerService {

  constructor() { }
  zoom = 0;

  moveUp(camera){
    this.zoom +=0.001;
    camera.translateY(this.zoom);    
  }

  moveDown(camera){
    this.zoom +=0.001;
    camera.translateY(-this.zoom);  
  }

  moveRight(camera){
    this.zoom +=0.001;
    camera.translateX(this.zoom);  
  }

  moveLeft(camera){
    this.zoom +=0.001;
    camera.translateX(-this.zoom);  
  }

  rotateUp(camera){
    camera.rotation.x +=0.01;
  }

  rotateDown(camera){
    camera.rotation.x-=0.01;
  }

  rotateLeft(camera){
    camera.rotation.y+=0.01;
  }

  rotateRight(camera){
    camera.rotation.y-=0.01;
  }

  zoomPlus(camera){
    this.zoom +=0.0000001;
    camera.translateZ(-this.zoom);
  }

  zoomMinus(camera){
    this.zoom +=0.001;
    camera.translateZ(this.zoom);  
  }
}
