import Experience from "../Experience";
import * as THREE from "three";

export default class Portrait{
    constructor(){

        console.log("portrait");
        this.experience = new Experience();
        this.ressources = this.experience.ressources;
        this.portrait = this.ressources.items.portrait.scene.clone();
        this.startingPos = new THREE.Vector3(4.15,6.5,0);
        this.experience.scene.add(this.portrait);
        //this.portrait.position.set(6,6.5,0);
        this.startRotation =new THREE.Vector3(0,-Math.PI / 9,0);
    }

    update(){
        this.levitate(this.portrait, this.startingPos, this.startRotation, Math.PI/16,0.11,0.005,0.005,0.005, 0.001);
    }

    levitate(object, startingPos, startRotation, seed, verticalMovementFactor, xRotationFactor, yRotationFactor, zRotationFactor, speedFactor){
        object.position.x = startingPos.x;
        object.position.y = startingPos.y + verticalMovementFactor * Math.sin(this.experience.time.elapsed * speedFactor + seed);
        object.position.z = startingPos.z;
            object.rotation.x = startRotation.x + Math.PI * 2 * xRotationFactor * Math.sin(this.experience.time.elapsed * 0.001 + 10 + seed);
            object.rotation.y = startRotation.y + Math.PI * 2 * yRotationFactor * Math.sin(this.experience.time.elapsed * 0.001 + 2 + seed);
            object.rotation.z = startRotation.z + Math.PI * 2 * zRotationFactor * Math.sin(this.experience.time.elapsed * 0.001 + 1 + seed);
    }

}