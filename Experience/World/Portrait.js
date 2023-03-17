import Experience from "../Experience";
import * as THREE from "three";

export default class Portrait{
    constructor(){
        this.experience = new Experience();
        this.ressources = this.experience.ressources;

        this.portrait = this.ressources.items.portrait.scene.clone();
        this.portraitStartingPos = new THREE.Vector3(4.15,6.1,0);
        if(this.experience.mobileMode == true) this.portraitStartingPos = new THREE.Vector3(3.15,5.5,0);
        this.portraitStartRotation = new THREE.Vector3(0,-Math.PI / 9,0);

        this.robot = this.ressources.items.robot.scene.clone();
        this.robot.scale.set(0.1,0.1,0.1);

        this.nbRobots = 60;
        this.robots = [];

        this.setRobots(5, 0.2);
        
        this.experience.scene.add(this.portrait);
    }

    setRobots(nbRows, randomPositionFactor){
        for(let i = 0; i < this.nbRobots;i++){
            var robot = {
                model: this.robot.clone(),
                startPos: new THREE.Vector3(
                    this.portraitStartingPos.x + 1.5 * ((i%(this.nbRobots / nbRows)) - ((this.nbRobots / nbRows)/2)) + (Math.random()*2 -1) * randomPositionFactor,
                    this.portraitStartingPos.y + 1.5 * (Math.floor(i /(this.nbRobots / nbRows)) - nbRows/2) + (Math.random()*2 -1) * randomPositionFactor,
                    this.portraitStartingPos.z - 2 + 0.5 * ((i%(this.nbRobots / nbRows)) - ((this.nbRobots / nbRows)/2)) - (Math.random()*2 -1) * randomPositionFactor),
                startRot:new THREE.Vector3(
                    Math.random()*2*Math.PI, 
                    Math.random()*2*Math.PI,
                    Math.random()*2*Math.PI),
                seed: Math.random() * 15,
                verticalMovementFactor: Math.random() * 0.2,
                xRotationFactor : Math.random() * 0.1,
                yRotationFactor : Math.random() * 0.1,
                zRotationFactor : Math.random() * 0.1
            };
            this.robots.push(robot);
            this.experience.scene.add(robot.model);
        }
    }

    update(){
        this.levitate(this.portrait, this.portraitStartingPos, this.portraitStartRotation, Math.PI/16,0.11,0.005,0.005,0.005, 0.001);
        //console.log(this.robot.position);
        
        for(let i = 0; i < this.nbRobots;i++){
            var robot = this.robots.pop();
            if(robot != undefined){
                this.levitate(robot.model, robot.startPos, robot.startRot, robot.seed, robot.verticalMovementFactor,robot.xRotationFactor,robot.yRotationFactor,robot.zRotationFactor, 0.001);
                this.robots.unshift(robot);
            }
        }
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