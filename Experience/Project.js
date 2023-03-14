import * as THREE from "three";
import Experience from "./Experience";

export default class Project{
    constructor(name, contentDivId, mediaDivId, primaryModel, secondaryModel, primaryStartingPos, secondaryStartingPos){
        this.name = name;
        this.setHTMLContentId(contentDivId);
        this.setHTMLMediaId(mediaDivId);
        this.setModels(primaryModel, secondaryModel);
        this.setModelsStartingPos(primaryStartingPos, secondaryStartingPos);

        this.experience = new Experience();
        this.levitator = this.experience.world.levitator;
    }

    setModels(primaryModel, secondaryModel){
        this.primaryModel = primaryModel;
        this.secondaryModel = secondaryModel;
    }

    setModelsStartingPos(primaryStartingPos, secondaryStartingPos){
        this.primaryStartingPos = primaryStartingPos;
        this.secondaryStartingPos = secondaryStartingPos;
    }

    setHTMLContentId(contentDivId){
        this.contentDivId = contentDivId;
    }

    setHTMLMediaId(mediaDivId){
        this.mediaDivId = mediaDivId;
    }

    setActive(active){
        if(active) this.levitator.setLevitatingObjectsAndStartPos(this.primaryModel, this.secondaryModel, this.primaryStartingPos, this.secondaryStartingPos);
        this.setDivActive(this.contentDivId, active);
        this.setDivActive(this.mediaDivId, active);
    }

    setDivActive(name, active){
        document.getElementById(name).hidden = !active;

        /*// This will disable all the children of the div
        var nodes = document.getElementById(name).getElementsByTagName('*');
        for(var i = 0; i < nodes.length; i++){
            nodes[i].hidden = !active;
        }*/
    }
}