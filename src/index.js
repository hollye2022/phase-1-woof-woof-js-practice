function getDogInfo(){
    fetch("http://localhost:3000/pups")
    .then(res => res.json())
    .then(data => {
        let div = document.getElementById("dog-bar");
        div.textContent = "";
        data.forEach(el => renderName(el.name, el.id, el.isGoodDog))
    })

}

function renderName(name, id, isGoodDog){
    let div = document.getElementById("dog-bar");
    let p = document.createElement("p");
    p.textContent = name;
    let span = document.createElement("span");
    span.id = id;
    span.textContent = name;
    span.addEventListener("click", () => postInfo(id));

    let filter = document.getElementById("good-dog-filter");
    if(filter.textContent === "Filter good dogs: OFF"){
        div.append(span);   
    } else if(filter.textContent === "Filter good dogs: On"){
        if (isGoodDog) {
            div.append(span);
        }
    }

}

getDogInfo();

function postInfo(id){
    fetch(`http://localhost:3000/pups/${id}`)
    .then(res => res.json())
    .then(data => {
        let container = document.getElementById("dog-summary-container");
        container.textContent = "";
        let image = document.createElement("img");
        image.src = data.image;
        image.style = "width:400px; height:400px; aspect-ratio: auto;";
        let h2 = document.createElement("h2");
        h2.textContent = data.name;
        let btn = document.createElement("button");
        btn.id = "dog";
        if (data.isGoodDog === true){
            btn.textContent = "Good Dog!"
        } else if (data.isGoodDog === false) {
            btn.textContent = "Bad Dog!"
        } 
        btn.addEventListener("click", () => toggle(id, data.isGoodDog))
        container.append(image, h2, btn)

    })

   
}

function toggle(id, isGoodDog) {
    fetch(`http://localhost:3000/pups/${id}`,{
        method: "PATCH",
        headers:{
            "Content-Type": "application/json",
            Accept:"application/json",
        },
        body: JSON.stringify({isGoodDog: !isGoodDog})
    })
   .then( () => postInfo(id))

}

document.addEventListener("DOMContentLoaded", handle);

function handle(){
    let filter = document.getElementById("good-dog-filter");
    filter.addEventListener("click", showDog);
}

function showDog(){
    let filter = document.getElementById("good-dog-filter");
    if(filter.textContent === "Filter good dogs: OFF"){
        filter.textContent = "Filter good dogs: On"
    } else if(filter.textContent === "Filter good dogs: On"){
        filter.textContent = "Filter good dogs: OFF"
    }

    getDogInfo();
}


