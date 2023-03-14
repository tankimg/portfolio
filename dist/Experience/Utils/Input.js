import Experience from "../Experience";
import * as THREE from "three";

export default class Input{
    constructor(){
    }

    /*isMouseOn(event, obj3d){
        var raycaster = new THREE.Raycaster();
        
        const exp = new Experience();
        const input = exp.input;
        const camera = exp.camera.perspectiveCamera;

        var mouse = this.getMousePos(event);
        raycaster.setFromCamera(mouse, camera);

        var intersects = raycaster.intersectObject(obj3d, true);
        if (intersects.length > 0) {
            console.log("INTERSECTS !");
        }
    }*/

    // Returns the mouses position in the normalize device space at the time of the given event
    getNDCMousePos(event){
        var vec = new THREE.Vector3(); // create once and reuse
        var pos = new THREE.Vector3(); // create once and reuse

        const exp = new Experience();
        const input = exp.input;
        const camera = exp.camera.perspectiveCamera;

        exp.input.lastClickEvent = event;
    
        vec.set(
        ( event.clientX / window.innerWidth ) * 2 - 1,
        - ( event.clientY / window.innerHeight ) * 2 + 1,
        0.5 );
    
        //vec.unproject( camera );
    
        //vec.sub( camera.position ).normalize();
    
        //var distance = - camera.position.z / vec.z;
    
        //pos.copy( camera.position ).add( vec.multiplyScalar( distance ) );

        return vec;
    }

    // Returns the position of the point of the plan defined by z = targetZ that is under the mouse at the time of the given event
    getWorldMousePos(event, targetZ){
        var vec = new THREE.Vector3(); // create once and reuse
        var pos = new THREE.Vector3(); // create once and reuse

        const exp = new Experience();
        const input = exp.input;
        const camera = exp.camera.perspectiveCamera;

        exp.input.lastClickEvent = event;
    
        vec.set(
        ( event.clientX / window.innerWidth ) * 2 - 1,
        - ( event.clientY / window.innerHeight ) * 2 + 1,
        0.5 );
    
        vec.unproject( camera );
    
        vec.sub( camera.position ).normalize();
    
        var distance = ( targetZ - camera.position.z ) / vec.z;
    
        pos.copy( camera.position ).add( vec.multiplyScalar( distance ));

        return vec;
    }
}