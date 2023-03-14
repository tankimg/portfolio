import * as THREE from "three";
import EventEmitter from "events";
import Experience from "../Experience";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader"
import {DRACOLoader} from "three/examples/jsm/loaders/DRACOLoader"
import {FBXLoader} from "three/examples/jsm/loaders/FBXLoader"

export default class Ressources extends EventEmitter{
    constructor(assets) {
        super();
        this.experience = new Experience();
        this.renderer = this.experience.renderer; 
        this.assets = assets;

        this.items = {};
        this.queue = this.assets.length;
        this.loaded = 0;

        this.setLoaders();
        this.startLoading();
    }

    setLoaders(){
        this.loaders = {};
        this.loaders.gltfLoader = new GLTFLoader();
        this.loaders.dracoLoader = new DRACOLoader();
        this.loaders.fbxLoader = new FBXLoader();
    }

    startLoading(){
        for(const asset of this.assets){
            console.log("asset is loading");
            if(asset.type === "gltfModel"){
                this.loaders.gltfLoader.load(asset.path, (file) => this.singleAssetLoaded(asset, file))
            } else if(asset.type === "fbxModel"){
                this.loaders.fbxLoader.load(asset.path, (file) => this.singleAssetLoaded(asset, file))
            }
        }
    }

    singleAssetLoaded(asset, file){
        this.items[asset.name] = file;
        this.loaded++;

        if(this.loaded === this.queue){
            console.log("all assets are loaded");
            this.emit("ready");
        }
    }

    initModelChildren(model){
        model.children.forEach(child => {
            child.castShadow = true;
            child.receiveShadow = true;

            if (child instanceof THREE.Group){
                child.children.forEach(groupchild => {
                    groupchild.castShadow = true;
                    groupchild.receiveShadow = true;
                });
            }
        });

        return model;
    }
}