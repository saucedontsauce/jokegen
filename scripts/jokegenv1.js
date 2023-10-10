//utils
var seed = "https://v2.jokeapi.dev/joke/"; // root of the api's url
// Get references to HTML elements
var pg = document.getElementById("cont"); // page content
var genbt = document.getElementById("genbtn"); // generate button
// category selection 
var catCont = document.getElementById("category"); // category selection wrapper for listener
var catradios = Array.from(document.getElementsByClassName("category-input")); // category group
var radiocat = catradios.find((val) => { return val.checked }); // get the checked radio button
// flags selection
var flagCont = document.getElementById("flags"); // flag selection wrapper needed for listener
var flagradios = Array.from(document.getElementsByClassName("flag-input")); // flag group
var radioflag = flagradios.find((val)=>{return val.checked}) // get the checked checkbox
// format selection
var formCont = document.getElementById("format"); // format selection wrapper for listener
var formradios = Array.from(document.getElementsByClassName("format-input")); // format group
var radioform = formradios.find((val)=>{return val.checked}); //  get the checked radio button
// display references 
var categoryDisplay = document.getElementById("joke-cat"); // category display box
var formatDisplay = document.getElementById("joke-form"); // format display box
var flagsDisplay = document.getElementById("joke-flags") // flag display box



// Define class for Jokes
class Joke {
    constructor() {
        this.link = ""; 
        this.category = null;
        this.flags = null;
        this.format = null;
        this.joke = null;
        this.preflags = [];
    }
    //builds link from values
    async build() {
        let prelinkage = this.preflags.join();
        let linkage = "blacklistFlags=" + prelinkage
        let newlink = "";
        await this.saucing();
        newlink += seed;
        newlink += this.category;
        if(this.format != ""){
            newlink += this.format;
        }
        if(prelinkage){
            if(this.format = "" || !this.format){
                newlink += "?" + linkage
            } else { newlink += "&" + linkage}

        }
        this.link = newlink
        console.log(this.link)
    }
    // adds sauce
    async saucing() {
        this.category = radiocat.value; // get selected catagory radio value
        this.format = radioform.value; // get selected format radio value
    }
    // call to api and set joke accordingly
    async set() {
        try {
        let loadjoke = await fetch(this.link).then((res) => { console.dir(res) ;res.json() }).then((data) => { this.joke = data; console.log("the joke has been retrieved");console.dir(data) });

        } catch (err) {
            console.error(err)
        }
        this.place()
    }
    //insert joke values into HTML
    place(){
        // place category
        categoryDisplay.innerHTML = this.category;
        //place format
        if (!this.format){
            formatDisplay.innerHTML = "Any";
        } else {
          formatDisplay.innerHTML = this.format;  
        }
        // place flags
        if (!this.flags) {
            flagsDisplay.innerHTML = "None";
        }
    }
}

// Joke class init as 'a'
let a = new Joke();

// Add event listeners
document.body.addEventListener('change', () => {
    a.build()
})
// Click event listener for the "Generate Joke" button
genbt.addEventListener("click", () => {
    a.set(); // Set The joke on click
});

// Change event listener for the category selection
catCont.addEventListener("change", (e) => {
    a.category = e.target.value; // get the selected value from the event and set as the new category
    console.log(a.category);// log category for testing remove for finished
});
// change event listener for the flags selection
flagCont.addEventListener("change", (e) => {
    let wasPresent = false;
    if(!a.preflags){
        a.preflags.push(e.target.value)
    }else{
        for(let i=0; i<a.preflags.length;i++){
            if(a.preflags[i] == e.target.value){
                a.preflags.splice(i, 1);
                wasPresent = true
            }
        }
        if(!wasPresent){
            a.preflags.push(e.target.value)
        }
    }  
    console.dir(a.preflags)
})

// change event listener for the format selection
formCont.addEventListener("change", (e) => {
 a.format = e.target.value; // get the selected value from event and set as the new format
 console.log(a.format)// log format on change
})