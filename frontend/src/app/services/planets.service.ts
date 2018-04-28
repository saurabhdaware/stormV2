import { Injectable } from '@angular/core';
import * as THREE from 'three';
// import GLTF2Loader from 'three-gltf2-loader';

// GLTF2Loader(THREE);

@Injectable()
export class PlanetsService{

  constructor() { }

  earthMesh;
  sunMesh;
  moonMesh;
  marsMesh;
  mercuryMesh;
  venusMesh;
  jupiterMesh;
  saturnMesh;
  uranusMesh;
  neptuneMesh;

  spotlight;
  orbitalMesh; 
  orbital(scene){
    let orbitalGeometry = new THREE.SphereGeometry(0.001957,52,52);
    const material = new THREE.MeshBasicMaterial({color:0xff0000});
    this.orbitalMesh = new THREE.Mesh(orbitalGeometry,material);
    scene.add(this.orbitalMesh);
    this.orbitalMesh.position.x = -10;
  }

  galaxy(scene){
      var starsGeometry = new THREE.Geometry();

      for ( var i = 0; i < 10000; i ++ ) {
      
        var star = new THREE.Vector3();
        star.x = THREE.Math.randFloatSpread( 30000 );
        star.y = THREE.Math.randFloatSpread( 30000 );
        star.z = THREE.Math.randFloatSpread( 30000 );
      
        starsGeometry.vertices.push( star );
      
      }
      
      var starsMaterial = new THREE.PointsMaterial( { color: 0x333333 } );
      
      var starField = new THREE.Points( starsGeometry, starsMaterial );
      
      scene.add( starField );
  }

  sun(scene){
      // SUN --
      let geometry = new THREE.SphereGeometry(6.957,52,52);
      const sunMaterial = new THREE.MeshBasicMaterial({color:0xffffff});
      this.sunMesh = new THREE.Mesh(geometry,sunMaterial);
      scene.add(this.sunMesh);
      sunMaterial.map = THREE.ImageUtils.loadTexture('assets/sunmap.jpg');
      sunMaterial.aoMapIntensity = 10;
      this.sunMesh.position.set(
        0,
        0,
        0
      )
      // SUN BRIGHTNESS --
      var light = new THREE.PointLight( 0xffffcc, 2);
      light.position.set( 0, 0, 0 );
      light.castShadow = true;
      light.shadow.mapSize.width = 512;  // default
      light.shadow.mapSize.height = 512; // default
      light.shadow.camera.near = 0.005;       // default
      light.shadow.camera.far = 500000      // default
      scene.add( light );


      // Darker Side of Objects
      scene.add(new THREE.AmbientLight(0x060606));
  }

  earth(scene){
        // Earth
        var geometry   = new THREE.SphereGeometry(0.06371, 32, 32)
        var material  = new THREE.MeshPhongMaterial()
        this.earthMesh = new THREE.Mesh(geometry, material)
        scene.add(this.earthMesh)
        material.map    = THREE.ImageUtils.loadTexture('assets/earthmap.jpg')
        material.specularMap    = THREE.ImageUtils.loadTexture('assets/earthspec.jpg')
        material.normalMap    = THREE.ImageUtils.loadTexture('assets/earthnorm.jpg')
        material.normalScale =  new THREE.Vector2( 1, 1 )

        // material.bumpMap    = THREE.ImageUtils.loadTexture('assets/earthbump.jpg')
        // material.bumpScale = 0.0064;
        this.earthMesh.position.x = -14;
        this.earthMesh.rotation.x = 23.439281 * Math.PI / 180; //Tilting the earth to make it real
        this.earthMesh.receiveShaodow = true;
        this.earthMesh.castShadow = true;
     
        //CLOUDS
        var clouds = new THREE.Mesh(
          new THREE.SphereGeometry(0.065, 32, 32),
          new THREE.MeshPhongMaterial({
            map: THREE.ImageUtils.loadTexture('assets/fair_clouds.png'),
            transparent: true
          })
        );  
        scene.add(clouds);
        this.earthMesh.add(clouds);
  }

  mars(scene){
    var geometry = new THREE.SphereGeometry(0.03397,32,32);
    var material = new THREE.MeshPhongMaterial()
    this.marsMesh = new THREE.Mesh(geometry,material)
    scene.add(this.marsMesh)
    material.map =  THREE.ImageUtils.loadTexture('assets/marsmap.jpg');
    material.normalMap =  THREE.ImageUtils.loadTexture('assets/marsnorm.jpg');
    material.normalScale =  new THREE.Vector2( 1, 1 )

    // material.bumpMap = THREE.ImageUtils.loadTexture('assets/marsbump.jpg');
    // material.bumpScale = 0.03;
    this.marsMesh.castShadow = true;
    this.marsMesh.receiveShaodow = true;
    this.marsMesh.position.x =-18;
    this.marsMesh.position.y = 0;
    this.marsMesh.position.z = 0;
    this.marsMesh.rotation.x = 25 * Math.PI / 180; //Tilting the earth to make it real

  }

  saturn(scene){
    var geometry = new THREE.SphereGeometry(0.58397,32,32);
    var material = new THREE.MeshPhongMaterial()
    this.saturnMesh = new THREE.Mesh(geometry,material)
    scene.add(this.saturnMesh)
    material.map =  THREE.ImageUtils.loadTexture('assets/saturnmap.jpg');

    var ring1Geometry = new THREE.RingGeometry( 0.7, 0.9, 32 ,5);
    var ring1Material = new THREE.MeshBasicMaterial({color:0x8e755f});
    // ringMaterial.map = THREE.ImageUtils.loadTexture('assets/saturnrings.png');
    ring1Material.side = THREE.DoubleSide;
    ring1Material.transparent = true;
    ring1Material.opacity = 0.8;
    var ring1Mesh = new THREE.Mesh( ring1Geometry, ring1Material );
    ring1Mesh.rotation.x = 90*Math.PI/180;
    scene.add(ring1Mesh);

    var ringGeometry = new THREE.RingGeometry( 0.91, 1.17, 32 ,5);
    var ringMaterial = new THREE.MeshBasicMaterial({color:0xf9d8a3});
    // ringMaterial.map = THREE.ImageUtils.loadTexture('assets/saturnrings.png');
    ringMaterial.side = THREE.DoubleSide;
    ringMaterial.transparent = true;
    ringMaterial.opacity = 0.8;
    var ringMesh = new THREE.Mesh( ringGeometry, ringMaterial );
    ringMesh.rotation.x = 90*Math.PI/180;
    scene.add( ringMesh );  

    var ring2Geometry = new THREE.RingGeometry( 1.22, 1.36, 32 ,5);
    var ring2Material = new THREE.MeshBasicMaterial({color:0xa5926d});
    // ringMaterial.map = THREE.ImageUtils.loadTexture('assets/saturnrings.png');
    ring2Material.side = THREE.DoubleSide;
    ring2Material.transparent = true;
    ring2Material.opacity = 0.8;
    var ring2Mesh = new THREE.Mesh( ring2Geometry, ring2Material );
    ring2Mesh.rotation.x = 90*Math.PI/180;
    
    //4b3e32
    scene.add(ring2Mesh);
    this.saturnMesh.add(ringMesh);
    this.saturnMesh.add(ring2Mesh);
    this.saturnMesh.add(ring1Mesh);
    this.saturnMesh.position.x = 7000;
    this.saturnMesh.rotation.z = 26.7*Math.PI/180;
  }

  mercury(scene){
    var geometry = new THREE.SphereGeometry(0.028397,32,32);
    var material = new THREE.MeshPhongMaterial()
    this.mercuryMesh = new THREE.Mesh(geometry,material)
    material.map =  THREE.ImageUtils.loadTexture('assets/mercurymap.jpg');
    scene.add(this.mercuryMesh);
    this.mercuryMesh.position.x = 1000;
  }

  venus(scene){
    var geometry = new THREE.SphereGeometry(0.06502,32,32);
    var material = new THREE.MeshPhongMaterial()
    this.venusMesh = new THREE.Mesh(geometry,material)
    material.map =  THREE.ImageUtils.loadTexture('assets/venusmap.jpg');
    scene.add(this.venusMesh);
    this.venusMesh.position.x = 1500;
  }

  jupiter(scene){
    var geometry = new THREE.SphereGeometry(0.69911,32,32);
    var material = new THREE.MeshPhongMaterial()
    this.jupiterMesh = new THREE.Mesh(geometry,material)
    material.map =  THREE.ImageUtils.loadTexture('assets/jupitermap.jpg');
    scene.add(this.jupiterMesh);
    this.jupiterMesh.position.x = 6000;
  }

  uranus(scene){
    var geometry = new THREE.SphereGeometry(0.25362,32,32);
    var material = new THREE.MeshPhongMaterial()
    this.uranusMesh = new THREE.Mesh(geometry,material)
    material.map =  THREE.ImageUtils.loadTexture('assets/uranusmap.jpg');
    scene.add(this.uranusMesh);
    this.uranusMesh.position.x = 9000;
    this.uranusMesh.rotation.z = 90*Math.PI/180;

    var ringGeometry = new THREE.RingGeometry( 0.30, 0.32, 32);
    var ringMaterial = new THREE.MeshBasicMaterial({color:0xffffff});
    // ringMaterial.map = THREE.ImageUtils.loadTexture('assets/saturnrings.png');
    ringMaterial.side = THREE.DoubleSide;
    ringMaterial.transparent = true;
    ringMaterial.opacity = 0.8;
    var ringMesh = new THREE.Mesh( ringGeometry, ringMaterial );
    ringMesh.rotation.x = 90*Math.PI/180;
    scene.add( ringMesh );
    
    this.uranusMesh.add(ringMesh);
  }

  neptune(scene){
    var geometry = new THREE.SphereGeometry(0.24622,32,32);
    var material = new THREE.MeshPhongMaterial()
    this.neptuneMesh = new THREE.Mesh(geometry,material)
    material.map =  THREE.ImageUtils.loadTexture('assets/neptunemap.jpg');
    scene.add(this.neptuneMesh);
    this.neptuneMesh.position.x = 10000;
  }

  moon(scene){
      // Moon
      var geometry = new THREE.SphereGeometry(0.02,32,32);
      var material = new THREE.MeshPhongMaterial()
      this.moonMesh = new THREE.Mesh(geometry,material)
      scene.add(this.moonMesh)
      material.map =  THREE.ImageUtils.loadTexture('assets/moonmap.jpg');
      material.bumpMap = THREE.ImageUtils.loadTexture('assets/moonbump.jpg');
      material.bumpScale = 0.002;
      this.moonMesh.castShadow = true;
      this.moonMesh.receiveShaodow = true;
      this.moonMesh.position.x =-14 +0.2;
      this.moonMesh.position.y = 0;
      this.moonMesh.position.z = 0;
  }
}
