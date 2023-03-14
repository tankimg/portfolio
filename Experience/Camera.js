import * as THREE from "three";
import Experience from "./Experience";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"

export default class Camera{
    constructor(){
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;

        this.createPerspectiveCamera();
        this.createOrthographicCamera();
        //this.setOrbitControls();
    }

    createPerspectiveCamera() {
        this.perspectiveCamera = new THREE.PerspectiveCamera(
            35,
            this.sizes.aspect,
            0.1,
            2000
        );

        this.scene.add(this.perspectiveCamera);
        this.perspectiveCamera.position.z = 10;
        this.perspectiveCamera.position.y = 5;
        this.perspectiveCamera.position.x = 0;

        /*this.perspectiveCamera.position.z = 150;
        this.perspectiveCamera.position.y = 5;
        this.perspectiveCamera.position.x = -1.5;*/

        this.perspectiveCamera.lookAt(this.perspectiveCamera.position.x + 3,this.perspectiveCamera.position.y,0);
    }

    createOrthographicCamera() {
        this.frustrum = 5;
        this.orthographicCamera = new THREE.OrthographicCamera(
            (-this.sizes.aspect * this.frustrum)/2,
            (this.sizes.aspect * this.frustrum)/2,
            this.frustrum/2,
            -this.frustrum/2,
            -100,
            100
        );

        /*this.scene.add(this.orthographicCamera);

        this.helper = new THREE.CameraHelper(this.orthographicCamera);
        this.scene.add(this.helper);

        this.scene.add(this.orthographicCamera);*/
    }

    setOrbitControls(){
        this.controls = new OrbitControls(this.perspectiveCamera, this.experience.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.enableZoom = false;
    }

    resize(){
        //Updating Perspective Camera
        this.perspectiveCamera.aspect = this.sizes.aspect;
        this.perspectiveCamera.updateProjectionMatrix();

        //Updating Orthographic Camera
        this.orthographicCamera.left = (-this.sizes.aspect * this.frustrum)/2;
        this.orthographicCamera.right = (this.sizes.aspect * this.frustrum)/2;
        this.orthographicCamera.top = this.frustrum/2;
        this.orthographicCamera.bottom = -this.frustrum/2;
        this.orthographicCamera.updateProjectionMatrix();
    }

    update(){
        //this.controls.update();

        /*this.helper.matrixWorldNeedsUpdate = true;
        this.helper.update();
        this.helper.position.copy(this.orthographicCamera.position);
        this.helper.rotation.copy(this.orthographicCamera.rotation);*/
    }
}