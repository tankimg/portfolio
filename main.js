import './style.css';
import Experience from './Experience/Experience'

const experience = new Experience(document.querySelector(".experience-canvas"));
var language = "en";
var frElements;
var enElements;

var el = document.getElementById("language");
if (el.addEventListener)
    el.addEventListener("click", switchLanguage, false);
else if (el.attachEvent)
    el.attachEvent('onclick', switchLanguage);

    switchLanguage();

function switchLanguage(){

    if(!frElements) frElements = document.getElementsByClassName("fr");
    if(!enElements) enElements = document.getElementsByClassName("en");
    if(language == "fr") 
    {
        console.log("language switched to en")
        language = "en";
        for(var i = 0; i < frElements.length; i++){
            frElements[i].classList.add("hidden");
        }
        for(var i = 0; i < enElements.length; i++){
            enElements[i].classList.remove("hidden");
        }
    }else{
        console.log("language switched to fr")
        language = "fr";

        for(var i = 0; i < enElements.length; i++){
            enElements[i].classList.add("hidden");
        }

        for(var i = 0; i < frElements.length; i++){
            console.log("before : " + frElements[i].classList)
            frElements[i].classList.remove("hidden");
            console.log("after : " + frElements[i].classList)
        }
    }
}

