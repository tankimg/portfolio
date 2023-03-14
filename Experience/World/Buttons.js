import * as THREE from "three";
import Experience from "../Experience";
import { Object3D, Vector3 } from "three";


export default class Buttons{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.ressources = this.experience.ressources;
        this.camera = this.experience.camera;
        this.projectSelector = this.experience.world.projectSelector;
        this.previousButton = this.ressources.items.button.scene.clone();
        this.nextButton = this.ressources.items.button.scene.clone();

        this.setButtons();

        this.levitator = this.experience.world.levitator;

        window.addEventListener("click", this.onclick, false);
    }

    setButtons(){
        this.scene.add(this.previousButton);
        this.scene.add(this.nextButton);

        this.ressources.initModelChildren(this.previousButton);
        this.ressources.initModelChildren(this.nextButton);

        this.previousButton.translateX(-0.5);
        this.previousButton.rotateX(-Math.PI / 9);
        //this.previousButton.rotateY(-Math.PI / 18);
        this.previousButton.rotateZ(Math.PI / 13);
        this.previousButton.scale.set(0.5, 0.5, 0.5);

        this.nextButton.translateX(3.5);
        this.nextButton.rotateX(-Math.PI / 9);
        //this.nextButton.rotateY(Math.PI / 18);
        this.nextButton.rotateZ(-Math.PI / 9 + Math.PI);
        this.nextButton.scale.set(0.5, 0.5, 0.5);
    }

    update(){

        this.previousButton.position.set(this.previousButton.position.x, 0.06 * Math.sin(this.experience.time.elapsed * 0.001 + 98), this.previousButton.position.z);
        this.nextButton.position.set(this.nextButton.position.x, 0.06 * Math.sin(this.experience.time.elapsed * 0.001 + 15), this.nextButton.position.z);
    }

    onclick(event) {
        var raycaster = new THREE.Raycaster();
            
        const exp = new Experience();
        const input = exp.input;
        const camera = exp.camera.perspectiveCamera;
        const buttons = exp.world.buttons;

        var mouse = input.getNDCMousePos(event);
        raycaster.setFromCamera(mouse, camera);

        var intersects = raycaster.intersectObject(buttons.nextButton, true);
        if (intersects.length > 0) {
            buttons.onNext();
        }

        intersects = raycaster.intersectObject(buttons.previousButton, true);
        if (intersects.length > 0) {
            buttons.onPrevious();
        }
    }

    onPrevious(){
        this.projectSelector.previousProject();
        
    }

    onNext(){
        this.projectSelector.nextProject();
    }

    
}

