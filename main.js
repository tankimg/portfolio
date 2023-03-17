import Experience from './Experience/Experience'


const experience = new Experience(document.querySelector(".experience-canvas"));

var el = document.getElementById("language");
console.log(el);
if (el.addEventListener){
    el.addEventListener("click", switchLanguage, false);
}
else if (el.attachEvent){
    el.attachEvent('onclick', switchLanguage);
}

function switchLanguage(){
    experience.switchLanguage();
}



