import Experience from './Experience/Experience'

const experience = new Experience(document.querySelector(".experience-canvas"));


var el = document.getElementById("language");
if (el.addEventListener){
    el.addEventListener("click", switchLanguage, false);
}
else if (el.attachEvent){
    el.attachEvent('onclick', switchLanguage);
}

function switchLanguage(){
    console.log("test")
    experience.switchLanguage();
}



