import * as THREE from "three";
import Experience from "../Experience";
import Levitator from "./Levitator";
import Ressources from "../Utils/Ressources";
import Environnement from "./Environnement";
import Room from "./Room";
import Buttons from "./Buttons";
import ProjectSelector from "../ProjectSelector";
import Controls from "./Controls";
import Portrait from "./Portrait";

export default class World{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;
        this.canvas = this.experience.canvas;
        this.camera = this.experience.camera;
        this.ressources = this.experience.ressources;
        
        
        this.ready = false;

        this.ressources.on("ready", () => {
            this.environnement = new Environnement();
            this.room = new Room();
            this.levitator = new Levitator();
            this.projectSelector = new ProjectSelector();
            this.buttons = new Buttons();
            
            this.controls = new Controls();
            this.portrait = new Portrait();
            this.ready = true;
        }
        );
    }

    resize(){
        
    }

    update(){
        if(this.ready){
            this.levitator.update();
            this.buttons.update();
            this.portrait.update();
        }
        if(this.controls){
            this.controls.update();
        }
    }
}