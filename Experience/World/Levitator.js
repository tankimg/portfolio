import * as THREE from "three";
import Experience from "../Experience";

export default class Levitator{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.ressources = this.experience.ressources;
        
        this.levitationBase = this.ressources.items.LevitationBase.scene.clone();
        this.levitatingObjectPos = new THREE.Vector3(0, -0.3, 0);
        this.secondaryLevitatingObjectPos = new THREE.Vector3(-0.5, 1, 1.2);

        this.setLevitatingObjects(this.mimi, undefined);
        this.index = 0;
        this.length = 3;

        this.setLevitationBase();
    }

    setLevitatingObjectsAndStartPos(levitatingObject, secondaryLevitatingObject, primaryStartingPos, secondaryStartingPos){

        if(levitatingObject != undefined){
            this.scene.remove(this.levitatingObject);
            this.levitatingObject = levitatingObject;
            this.scene.add(this.levitatingObject);
        }

        this.scene.remove(this.secondaryLevitatingObject);
        this.secondaryLevitatingObject = secondaryLevitatingObject;
        if(secondaryLevitatingObject != undefined){
            this.scene.add(this.secondaryLevitatingObject);
        }

        this.levitatingObjectPos = primaryStartingPos;
        this.secondaryLevitatingObjectPos = secondaryStartingPos;
    }

    setLevitatingObjects(levitatingObject, secondaryLevitatingObject){

        if(this.levitatingObject != undefined){
            this.scene.remove(this.levitatingObject);
            this.levitatingObject = levitatingObject;
            this.scene.add(this.levitatingObject);
        }
        
        this.scene.remove(this.secondaryLevitatingObject);
        this.secondaryLevitatingObject = secondaryLevitatingObject;
        if(this.secondaryLevitatingObject != undefined){
            this.scene.add(this.secondaryLevitatingObject);
        }
    }

    setLevitationBase(){
        this.scene.add(this.levitationBase);
        this.levitationBase.scale.set(4, 4, 4);
        this.levitationBase.position.set(1.5,-1.5,-2);
        this.ressources.initModelChildren(this.levitationBase);
    }

    resize(){
        
    }

    update(){
        if(this.levitatingObject != undefined){
            this.levitate(this.levitatingObject, Math.PI/7, this.levitatingObjectPos);
        }
        if(this.secondaryLevitatingObject != undefined){
            this.levitate(this.secondaryLevitatingObject, Math.PI/3, this.secondaryLevitatingObjectPos);
        }
    }

    levitate(object, seed, startingPos){
        object.position.x = startingPos.x;
        object.position.y = startingPos.y + 0.1 * Math.sin(this.experience.time.elapsed * 0.001 + seed);
        object.position.z = startingPos.z;
            object.rotation.x = Math.PI * 2 * 0.008 * Math.sin(this.experience.time.elapsed * 0.001 + 10 + seed);
            object.rotation.y = Math.PI * 2 * 0.005 * Math.sin(this.experience.time.elapsed * 0.001 + 2 + seed);
            object.rotation.z = Math.PI * 2 * 0.003 * Math.sin(this.experience.time.elapsed * 0.001 + 1 + seed);
    }
}
