import * as THREE from "three";

import Sizes from "./Utils/Sizes";
import Time from "./Utils/Time";
import Ressources from "./Utils/Ressources";
import assets from "./Utils/assets";

import Camera from "./Camera";
import Renderer from "./Renderer";

import World from "./World/World";
import Input from "./Utils/Input";


export default class Experience{
    static instance;
    constructor(canvas){

        if(Experience.instance){
            return Experience.instance;
        }
        Experience.instance = this;

        this.sizes = new Sizes();

        this.canvas = canvas;
        this.scene = new THREE.Scene();
        this.time = new Time();
        
        this.input = new Input();
        this.camera = new Camera();
        this.renderer = new Renderer();
        this.ressources = new Ressources(assets);

        this.world = new World();

        this.time.on("update", () => this.update());

        this.sizes.on("resize", () => this.resize());

        if(this.sizes.width < 800){
            //MOBILE MODE
            this.mobileMode = true;
            this.goMobile();

        }else{
            //MOBILE MODE
            this.mobileMode = false;
            this.goDefault();
        }
    }

    resize(){
        this.camera.resize();
        this.renderer.resize();
    }

    update(){
        this.camera.update();
            this.renderer.update();
            this.world.update();
    }

    goMobile(){
        this.loadCSS("mobileStyle.css");
    }
    
    goDefault(){
        this.loadCSS("style.css");
    }
    
    loadCSS(filename){
        document.getElementById("cssimport").setAttribute("href", filename);
    }
}