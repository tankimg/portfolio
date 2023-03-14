import * as THREE from "three";
import Experience from "../Experience";

export default class Room{
    constructor(){

        this.experience = new Experience();
        this.scene = this.experience.scene;

        this.geometry = new THREE.PlaneGeometry(1000,1000); 
        this.mat = new THREE.MeshStandardMaterial({ color : "#FAF4E5"});
        this.mesh = new THREE.Mesh(this.geometry, this.mat);

        this.scene.add(this.mesh);
        this.mesh.translateZ(-5);
        this.mesh.rotateZ(Math.PI/2);
    }

}