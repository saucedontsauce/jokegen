let utils = {
    "root": "https://v2.jokeapi.dev/joke/",
    "category": {
        "any": "Any",
        "programming": "Programming",
        "misc": "Misc",
        "dark": "Dark",
        "pun": "Pun",
        "spooky": "",
        "christmas": ""
    }
    
};

class JokeLink {
    constructor(cat, flags, type){
        this.category = cat;
        this.flags = flags;
        this.type = type;
    }
    build(){
        return {

        }
    }
}

let pg = document.getElementById("cont");
let conf = {
    "any": "https://v2.jokeapi.dev/joke/Any",
    "joke": {}
};




function makeLink() {
 let joke = new JokeLink(any, none, none);
 joke.build()
 console.log(conf.joke)
}

const functionalityLOL = async () => {
    let loadjoke = await fetch(conf.any).then((res) => { return res.json() }).then((data) => { conf.joke = data });



    console.log(conf.joke)

}
pg.addEventListener("load", functionalityLOL())