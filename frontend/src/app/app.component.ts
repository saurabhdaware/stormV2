import {Component, ViewChild, ElementRef,HostListener} from '@angular/core';
import * as THREE from 'three';
import OrbitControls from 'orbit-controls-es6';
import GLTF2Loader from 'three-gltf2-loader';
import {PlanetsService}  from './services/planets.service';
import{ControllerService} from './services/controller.service';
import {HttpClient,HttpHeaders, HttpErrorResponse} from '@angular/common/http'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'app';
  @ViewChild('rendererContainer') rendererContainer: ElementRef;
  renderer = new THREE.WebGLRenderer();
  scene = null;
  camera = null;
  zoom = 0;
  earthday = null;
  controls;
  clock;
  earthRotAngleDeg=0;
  marsRotAngleDeg = 0;
  i = 0;
  realtimeLocation = false;
  date = '1993-01-03';
  time='10:00';

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) { 
    if(event.key == 'w'){
      this.Controller.rotateUp(this.camera);
    }
    if(event.key == 'd'){
      this.Controller.rotateRight(this.camera);
    }
    if(event.key == 'a'){
      this.Controller.rotateLeft(this.camera);
    }
    if(event.key == 's'){
      this.Controller.rotateDown(this.camera);
    }
    if(event.key == 'z'){
      this.Controller.zoomPlus(this.camera);
    }
    if(event.key == 'x'){
      this.Controller.zoomMinus(this.camera);
    }
    if(event.key =='ArrowUp'){
      this.Controller.moveUp(this.camera)
    }
    if(event.key =='ArrowDown'){
      this.Controller.moveDown(this.camera);
    }
    if(event.key =='ArrowLeft'){
      this.Controller.moveLeft(this.camera);
    }
    if(event.key =='ArrowRight'){
      this.Controller.moveRight(this.camera)
    }
  }

  constructor(private Planets:PlanetsService,private Controller:ControllerService,private http:HttpClient) {

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.00002, 99999999999999999999999999);
    // this.camera.position.z = 20;
    this.camera.updateProjectionMatrix();
    this.controls = new OrbitControls( this.camera,this.renderer.domElement );
    this.clock = new THREE.Clock()

    //controls.update() must be called after any manual changes to the camera's transform
    this.camera.position.set( 0, 0, 20 );
    this.controls.update();
    // Load planets and environment
    Planets.sun(this.scene);
    Planets.earth(this.scene);
    Planets.moon(this.scene);
    Planets.mars(this.scene);
    Planets.saturn(this.scene);
    Planets.mercury(this.scene);
    Planets.venus(this.scene);
    Planets.jupiter(this.scene);
    Planets.uranus(this.scene);
    Planets.neptune(this.scene);
    Planets.orbital(this.scene);
    Planets.galaxy(this.scene);
  }

  ngAfterViewInit() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
    document.body.appendChild( this.renderer.domElement );
    this.animate();
    console.log(this.date);
    // var axesHelper = new THREE.AxesHelper( 500000 );
    // this.scene.add( axesHelper );
  }

  marsRevolve(){
    let marsRevAngleDeg = 210+(this.earthday*360/687);
    let marsSunDistPeri = 206.7*10;
    let marsSunDistAphi = 249.2*10;
    let marsSemiMajorAxis = (marsSunDistPeri+marsSunDistAphi)/2
    let marsSemiMinorAxis = 229.58*10;

    this.Planets.marsMesh.position.set(
      (-1*(marsSemiMajorAxis - marsSunDistPeri)*Math.sin(60*Math.PI/180)+marsSemiMajorAxis*Math.cos(330*Math.PI/180)*Math.cos(marsRevAngleDeg*Math.PI/180))+(marsSemiMinorAxis*Math.sin(-330*Math.PI/180)*Math.sin(marsRevAngleDeg*Math.PI/180)), 
      0,
      -(-1*(marsSemiMajorAxis - marsSunDistPeri)*Math.cos(60*Math.PI/180)+marsSemiMinorAxis*Math.cos(-330*Math.PI/180)*Math.sin(marsRevAngleDeg*Math.PI/180))-(marsSemiMajorAxis*Math.sin(330*Math.PI/180)*Math.cos(marsRevAngleDeg*Math.PI/180))
    );
 
    this.marsRotAngleDeg = this.earthday*360/1.3;
    this.Planets.marsMesh.rotation.y =  this.marsRotAngleDeg*Math.PI/180;
  }

  orbitalMovement(){
    let inOrbitAngleDeg=this.earthday*360/1;
    let inOrbitPeri = 0.06371+0.5;
    let inOrbitApo = 0.06371+ 0.6;
    let inOrbitSemiMinor = 0.06371+ 0.005;
    // let dateMoon = Date.now() * 0.000115;
    // let date = Date.now()*0.001;
    if(Math.cos(inOrbitAngleDeg*Math.PI/180)>0){
      this.Planets.orbitalMesh.position.set(
        this.Planets.earthMesh.position.x + Math.cos(inOrbitAngleDeg*Math.PI/180) * inOrbitApo,
        -Math.sin(inOrbitAngleDeg*Math.PI/180)*0.3072,
        this.Planets.earthMesh.position.z - Math.sin(inOrbitAngleDeg*Math.PI/180) * inOrbitSemiMinor
      );
    }else{
      this.Planets.orbitalMesh.position.set(
        this.Planets.earthMesh.position.x + Math.cos(inOrbitAngleDeg*Math.PI/180) * inOrbitPeri,
        -Math.sin(inOrbitAngleDeg*Math.PI/180)*0.3072,
        this.Planets.earthMesh.position.z-Math.sin(inOrbitAngleDeg*Math.PI/180)*inOrbitSemiMinor
      );
    }

    // this.Planets.orbitalMesh.position.set(
    //   this.Planets.earthMesh.position.x + Math.cos(inOrbitAngleDeg*Math.PI/180) * (inOrbitPeri+((inOrbitApo-inOrbitPeri)*Math.cos(inOrbitAngleDeg*Math.PI/180))),
    //   -Math.sin(inOrbitAngleDeg*Math.PI/180)*0.0001,
    //   this.Planets.earthMesh.position.z - Math.sin(inOrbitAngleDeg*Math.PI/180) * (inOrbitPeri)
    // );
  }


  moonRevolve(){
    let moonRevAngleDeg = this.earthday*360/27;
    // let dateMoon = Date.now() * 0.000115;
    // let date = Date.now()*0.001;
    if(Math.cos(moonRevAngleDeg*Math.PI/180)>0){
      this.Planets.moonMesh.position.set(
        this.Planets.earthMesh.position.x + Math.cos(moonRevAngleDeg*Math.PI/180) * 4.05,
        -Math.sin(moonRevAngleDeg*Math.PI/180)*0.3072,
        this.Planets.earthMesh.position.z - Math.sin(moonRevAngleDeg*Math.PI/180) * 3.79
      );
    }else{
      this.Planets.moonMesh.position.set(
        this.Planets.earthMesh.position.x + Math.cos(moonRevAngleDeg*Math.PI/180) * 3.63,
        -Math.sin(moonRevAngleDeg*Math.PI/180)*0.3072,
        this.Planets.earthMesh.position.z-Math.sin(moonRevAngleDeg*Math.PI/180)*3.79
      );
    }
  }

  earthRevolve(){
    let earthSunDistPeri = 147.6*10;
    let earthSunDistAphi = 152.1*10;
    let earthSemiMajorAxis = (earthSunDistAphi + earthSunDistPeri)/2;
    let earthSemiMinorAxis = 149.58*10;
    let earthRevAngleDeg = 0+(this.earthday*360/365.25);
    // let earthRevAngleDeg = 0;
    this.Planets.earthMesh.position.set(
      (-1*(earthSemiMajorAxis - earthSunDistPeri)*Math.sin(30*Math.PI/180)+earthSemiMajorAxis*Math.cos(300*Math.PI/180)*Math.cos(earthRevAngleDeg*Math.PI/180))+(earthSemiMinorAxis*Math.sin(-300*Math.PI/180)*Math.sin(earthRevAngleDeg*Math.PI/180)), 
      0,
      -((earthSemiMajorAxis - earthSunDistPeri)*Math.cos(30*Math.PI/180)+earthSemiMinorAxis*Math.cos(-300*Math.PI/180)*Math.sin(earthRevAngleDeg*Math.PI/180))-(earthSemiMajorAxis*Math.sin(300*Math.PI/180)*Math.cos(earthRevAngleDeg*Math.PI/180))
    );

  }

  earthRotate(){
    this.earthday = this.earthRotAngleDeg/360
    this.earthRotAngleDeg += 0.00004166666*this.i;
    // console.log(this.earthRotAngleDeg);
    this.Planets.earthMesh.rotation.y =  this.earthRotAngleDeg*Math.PI/180;
  }
 


  // Controllers, Teleport and other functions ::::::::::::::::::::::::::::::::::

  takeMeToTheEarth(){
    // this.camera.position.x = this.Planets.earthMesh.position.x
    // this.camera.position.z = this.Planets.earthMesh.position.z + 0.3;
    // this.camera.position.y = this.Planets.earthMesh.position.y + 0;
    this.camera.position.x = 0;
    this.camera.position.y = 0;
    this.camera.position.z = 0.2;
    this.camera.rotation.y = 0;
    this.Planets.earthMesh.add(this.camera);
    this.Planets.moonMesh.remove(this.camera);
    // this.controls.zoomSpeed = 0.01;
    // this.controls.panSpeed = 0.1
    // this.controls.rotateSpeed = 1
    // this.controls.update();
  }

  takeMeToTheMoon(){
    this.camera.position.x = 0;
    this.camera.position.y = 0;
    this.camera.position.z = 0.06;
    this.Planets.moonMesh.add(this.camera);
  }

  takeMeToTheMars(){
    this.camera.position.x = 0;
    this.camera.position.y = 0;
    this.camera.position.z = 0.09;
    this.Planets.marsMesh.add(this.camera);
  }

  takeMeToTheSun(){
    this.camera.position.x = 0;
    this.camera.position.y = 0;
    this.camera.position.z = 10;
    this.Planets.sunMesh.add(this.camera);
  }

  takeMeToTheMercury(){
    this.camera.position.x = 0;
    this.camera.position.y = 0;
    this.camera.position.z = 0.04;
    this.Planets.mercuryMesh.add(this.camera);
  }

  takeMeToTheVenus(){
    this.camera.position.x = 0;
    this.camera.position.y = 0;
    this.camera.position.z = 0.2;
    this.Planets.venusMesh.add(this.camera);
  }

  takeMeToTheJupiter(){
    this.camera.position.x = 0;
    this.camera.position.y = 0;
    this.camera.position.z = 1.4;
    this.Planets.jupiterMesh.add(this.camera);
  }

  takeMeToTheSaturn(){
    this.camera.position.x = 0;
    this.camera.position.y = 0;
    this.camera.position.z = 1.5;
    this.Planets.saturnMesh.add(this.camera);
  }

  takeMeToTheUranus(){
    this.camera.position.x = 0;
    this.camera.position.y = 0;
    this.camera.position.z = 0.5;
    this.Planets.uranusMesh.add(this.camera);
  }

  takeMeToTheNeptune(){
    this.camera.position.x = 0;
    this.camera.position.y = 0;
    this.camera.position.z = 0.5;
    this.Planets.neptuneMesh.add(this.camera);
  }

  moveFaster(){
    this.i = this.i + 10000;
  }

  getPlanetPositions(){
    let d = new Date(this.date);
    let day=d.getDate();
    let month = d.getMonth()+1;
    let year = d.getFullYear();
    this.http.get("http://localhost:8000/date/?day="+day+"&month="+month+"&year="+year).subscribe(data => this.earthRotAngleDeg = data.days*360)
  }

  getPlanetRotation(){
    let t = this.time;
    this.http.get("http://localhost:8000/getRotationEarth/?hr="+this.time).subscribe(data => this.earthRotAngleDeg = this.earthday*360+ (data.hr/24) )

  }

  getAngle(){
    // this.http.get("http://localhost:8000/angle/?totalDays="+this.earthday+"&yearOnThatPlanet=365.25").subscribe(data=>{this.earthRevAngleDeg = 270+22.5+int(data.angle)})
  }
  animate() {
    setInterval(()=>{
      this.moonRevolve();
      this.earthRevolve();
      this.earthRotate();
      this.orbitalMovement();
      this.marsRevolve();
      this.renderer.render(this.scene, this.camera);
    },10)

  }

}

