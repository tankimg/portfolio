import * as THREE from "three";
import Experience from "./Experience";
import Project from "./Project";

export default class ProjectSelector{
    constructor(){
        this.experience = new Experience();
        this.ressources = this.experience.ressources;
        this.levitator = this.experience.world.levitator;

        this.setProjects();

        this.nextProject();
    }

    setProjects(){
        //Import Models from ressources and fit them for projects
        this.mimi = this.ressources.items.mimi.scene.clone();
        this.mimi.scale.set(0.2,0.2,0.2);
        this.ressources.initModelChildren(this.mimi);

        this.racket = this.ressources.items.racket.scene.clone();
        this.racket.scale.set(2,2,2);
        this.ressources.initModelChildren(this.racket);

        this.ball = this.ressources.items.ball.scene.clone();
        this.ball.scale.set(0.1,0.1,0.1);
        this.ressources.initModelChildren(this.ball);

        this.pacmax = this.ressources.items.pacmax.scene.clone();
        this.pacmax.scale.set(0.7,0.7,0.7);
        this.ressources.initModelChildren(this.pacmax);

        this.pacGum = this.ressources.items.pacGum.scene.clone();
        this.pacGum.scale.set(0.1,0.1,0.1);
        this.ressources.initModelChildren(this.pacGum);

        this.robot = this.ressources.items.robot.scene.clone();
        this.ressources.initModelChildren(this.robot);
        this.robot.scale.set(0.4,0.4,0.4);

        // Create the different projects
        this.projects = [];
        const tp = new Project("thruston","thruston-HTML-Content", "thruston-HTML-Media", this.mimi, undefined, new THREE.Vector3(1.5, -0.3, 0), new THREE.Vector3(1, 1, 1.2));
        const jdpp = new Project("jeuDePaume","jeuDePaume-HTML-Content", "jeuDePaume-HTML-Media", this.racket, this.ball, new THREE.Vector3(1.5, -0.3, 0), new THREE.Vector3(1, 1, 1.2));
        const pacp = new Project("pacmax","pacmax-HTML-Content", "pacmax-HTML-Media", this.pacmax, this.pacGum, new THREE.Vector3(1.5, 0.3, 0), new THREE.Vector3(2.2, 0.3, 1.2));
        const losp = new Project("LastOneStanding","los-HTML-Content","los-HTML-Media", this.robot , undefined, new THREE.Vector3(1.5, -0.3, 0), new THREE.Vector3(1, 1, 1.2));

        tp.setActive(false);
        jdpp.setActive(false);
        pacp.setActive(false);
        losp.setActive(false);

        this.projects.push(tp);
        this.projects.push(losp);
        this.projects.push(jdpp);
        this.projects.push(pacp);
    }

    nextProject(){
        var proj = this.projects.shift();
        if(this.selectedProject === proj){
            this.projects.push(proj);
            proj = this.projects.shift();
        } 
        this.selectProject(proj);
        this.projects.push(proj);
    }

    previousProject(){
        var proj = this.projects.pop();
        if(this.selectedProject === proj){
            this.projects.unshift(proj);
            proj = this.projects.pop();
        }
        this.selectProject(proj);
        this.projects.unshift(proj);
    }

    selectProject(project){ 
        if(this.selectedProject != undefined)
            this.selectedProject.setActive(false);
        this.selectedProject = project;
        this.selectedProject.setActive(true);
    }
}