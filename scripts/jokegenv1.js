let pg = document.getElementById("cont");
let genbt = document.getElementById("genbtn");
let radios = Array.from(document.getElementsByName("category"));
let radiocat = radios.find((inde)=>{return inde.value=="on"});
const catCont= document.getElementById("catgorry");
const seed = "https://v2.jokeapi.dev/joke/";
class Joke {
    constructor(){
        this.link = seed + this.cat;
        this.category = undefined ;
        this.flags = undefined;
        this.type = undefined;
        this.joke = undefined;
    }
    async build(){
        this.saucing()
        await this.set()
    }
    saucing(){
        this.category = radiocat.alt
        return console.log(this.category)
    }
    async set(){let loadjoke = await fetch(this.link).then((res) => { return res.json() }).then((data) => { this.joke = data; console.log("the there joke done did been gotten")});}
};
let a = new Joke;

console.log(document)

//listener crew
genbt.addEventListener("click", () => {
    a.build()
    console.log('jokkkkkez')
});


catCont.addEventListener("change", (e) => {
        a.category = e.target.alt;
        console.log(a.category)
})

