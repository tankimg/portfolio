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

        this.language = "en";
        this.frElements;
        this.enElements;

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

        this.switchLanguage();
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
        var links = document.getElementsByTagName("link");
        console.log(links);
        links[1].setAttribute("href", filename);
    }

    switchLanguage(){

        if(!this.frElements) this.frElements = document.getElementsByClassName("fr");
        if(!this.enElements) this.enElements = document.getElementsByClassName("en");
        if(this.language == "fr") 
        {
            console.log("language switched to en")
            this.language = "en";
            for(var i = 0; i < this.frElements.length; i++){
                this.frElements[i].classList.add("hidden");
            }
            for(var i = 0; i < this.enElements.length; i++){
                this.enElements[i].classList.remove("hidden");
            }
        }else{
            console.log("language switched to fr")
            this.language = "fr";
    
            for(var i = 0; i < this.enElements.length; i++){
                this.enElements[i].classList.add("hidden");
            }
    
            for(var i = 0; i < this.frElements.length; i++){
                this.frElements[i].classList.remove("hidden");
            }
        }
    }
}