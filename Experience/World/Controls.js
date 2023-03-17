import * as THREE from "three";
import Experience from "../Experience";
import GSAP from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger.js";
import ASScroll from "@ashthornton/asscroll";

export default class Controls{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.time = this.experience.time;
        this.camera = this.experience.camera.perspectiveCamera;
        GSAP.registerPlugin(ScrollTrigger);

        this.setSmoothScroll();
        this.setPath();

        if (history.scrollRestoration) {
            history.scrollRestoration = 'manual';
        } else {
            window.onbeforeunload = function () {
                window.scrollTo(0, 0);
            }
        }
    }

    setPath(){
        if(this.experience.sizes.width < 1200){
            GSAP.to(this.camera.position, {
                y: -1,
                z: 18,
                x: 3,
                duration : 2,
                scrollTrigger:{
                    trigger: ".first-move",
                    toggleActions: "play pause pause reverse",
                    start: "top top",
                    end: "80% top",
                    scrub: 1.5
                }
            });

            GSAP.to(this.camera.rotation, {
                y: 0,
                duration : 2,
                scrollTrigger:{
                    trigger: ".first-move",
                    toggleActions: "play pause pause reverse",
                    start: "top top",
                    end: "80% top",
                    scrub: 1.5
                }
            });


        }else{
            GSAP.to(this.camera.position, {
                y: 0,
                duration : 2,
                scrollTrigger:{
                    trigger: ".first-move",
                    toggleActions: "play pause pause reverse",
                    start: "top top",
                    end: "80% top",
                    scrub: 1.5
                }
            });
        }

        GSAP.to(".peach", {
            scrollTrigger: {
                pin: true,
                pinType: this.isTouch ? 'fixed' : 'transform',
                end: '200%',
                scrub: 0.2,
                trigger: ".peaches"
            },
            y: (i, target) => -this.totalScroll * target.dataset.speed,
            ease: "none"
        });

        GSAP.to(".socials", {
            scrollTrigger: {
                pin: true,
                pinType: this.isTouch ? 'fixed' : 'transform',
                end: '5000%',
                scrub: 0.2,
                trigger: ".socials-wrapper"
            },
            y: (i, target) => -this.totalScroll * target.dataset.speed,
            ease: "none"
        });
    }

    setSmoothScroll(){
        this.asscroll = this.setupASScroll();
    }

    setupASScroll() {
        // https://github.com/ashthornton/asscroll
        const asscroll = new ASScroll({
            ease:0.075,
            disableRaf: true
        });

        console.log(asscroll.maxScroll);

        this.isTouch = 'ontouchstart' in document.documentElement;
        this.totalScroll = asscroll.containerElement.scrollHeight - innerHeight;
    
        GSAP.ticker.add(asscroll.update);
    
        ScrollTrigger.defaults({
            scroller: asscroll.containerElement
        });
    
        ScrollTrigger.scrollerProxy(asscroll.containerElement, {
            scrollTop(value) {
                if (arguments.length) {
                    asscroll.currentPos = value;
                    return;
                }
                return asscroll.currentPos;
            },
            getBoundingClientRect() {
                return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight }
            },
            fixedMarkers: true
        });
    
        asscroll.on("update", ScrollTrigger.update);
        ScrollTrigger.addEventListener("refresh", asscroll.resize);
        
        requestAnimationFrame(() => {
           asscroll.enable({
                newScrollElements: document.querySelectorAll(".gsap-marker-start, .gsap-marker-end, [asscroll]")
            }); 
        });
        return asscroll;
    }

    resize(){

    }

    update(){

    }

}