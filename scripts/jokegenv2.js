//utils
var seed = "https://v2.jokeapi.dev/joke/"; // root of the api's url
var genericLink = "https://v2.jokeapi.dev/joke/Any"
var receivedData = {
    "linkInitial": "https://v2.jokeapi.dev/joke/",
    "selectedFlags": []
}
htemel = {
    "page": document.getElementById("cont"),
    "genButton": document.getElementById("genbtn"),
    "categoryWrap": document.getElementById("category"),
    "categoryInput": Array.from(document.getElementsByClassName("category-input")),
    "flagWrap": document.getElementById("flags"),
    "flagInput": Array.from(document.getElementsByClassName("flag-input")),
    "formatWrap": document.getElementById("format"),
    "formatInput": Array.from(document.getElementsByClassName("format-input")),
    "displayCategory": document.getElementById("joke-cat"),
    "displayFlags": document.getElementById("flag-display"),
    "displayFormat": document.getElementById("joke-form"),
    "displayJoke": document.getElementById("joke-joke"),
}
function processChanges() {
    htemel.categoryChecked = htemel.categoryInput.find((val) => { return val.checked });
    htemel.flagsChecked = htemel.flagInput.find((val) => { return val.checked });
    htemel.formatChecked = htemel.formatInput.find((val) => { return val.checked });
}

function generateLink() {
    // source blacklist and form new variable = to the actual string
    var fixedData = "";
    var blackFlags = "";
    if (receivedData.selectedFlags) {
        fixedData = receivedData.selectedFlags.join();
        blackFlags = "?blacklistFlags=" + fixedData;
    }
    // start new link and add add initial link
    let newLink = "";
    newLink += receivedData.linkInitial;
    // attach category
    if (!receivedData.selectedCategory) {
        newLink += "Any";
    } else {
        newLink += receivedData.selectedCategory;
    }
    // attach the blacklist
    if (fixedData) {
        newLink += blackFlags;
    }
    // attach format 
    if (receivedData.selectedFormat) {
        if (fixedData) {
            newLink += "&" + receivedData.selectedFormat;
        } else {
            newLink += "?" + receivedData.selectedFormat;
        }
    }
    // set the confirmed link to newLink to be used for fetch()
    receivedData.linkConfirmed = newLink;
}
async function makeFetchCall() {
    try {
        await fetch(receivedData.linkConfirmed)
            .then((res) => { return res.json() })
            .then((data) => { receivedData.rawData = data })
    } catch (err) {
        console.log("An Error Has Occured");
        console.error(err.code);
        console.error(err.message);

    } finally {
        console.log("Call Made");
    }
}
function sanitizeData() {
    receivedData.category = receivedData.rawData.category;
    receivedData.flags = receivedData.rawData.flags;
    receivedData.format = receivedData.rawData.type;
    switch (receivedData.rawData.type) {
        case "single": {
            let singleForm = `<div class="joke-single">${receivedData.rawData.joke}</div>`;
            receivedData.refinedForm = singleForm;
            break;
        }
        case "twopart": {
            let doubleForm = `<div class="joke-double"><div class="joke-setup">${receivedData.rawData.setup}</div><div class="joke-punchline">${receivedData.rawData.delivery}</div></div>`;
            receivedData.refinedForm = doubleForm;
        }
    }
}
function insertData() {
    htemel.displayCategory.innerHTML = receivedData.category;
    htemel.displayFormat.innerHTML = receivedData.format;
    htemel.displayJoke.innerHTML = receivedData.refinedForm;
    if (receivedData.flags) {
        let flagreceived = false;
        let flagkeys = Object.keys(receivedData.flags);
        let flagvalues = Object.values(receivedData.flags);
        let flagstring =""
        for(let i=0; i < flagvalues.length;i++){
            if(flagvalues[i]==true){
                flagreceived = true;
                let tobeadded = `<p class="flag-individual">${flagkeys[i]}</p>`
                flagstring += tobeadded;
            }
        }
        if(flagreceived){
            htemel.displayFlags.innerHTML = flagstring;
        } else {
            htemel.displayFlags.innerHTML = `<p>None</p>`
        }
    }
}
    
// listeners
document.body.addEventListener('change', processChanges());
htemel.genButton.addEventListener("click", async () => {
    generateLink();
    await makeFetchCall();
    sanitizeData();
    insertData();
});
htemel.categoryWrap.addEventListener("change", (e) => {
    receivedData.selectedCategory = e.target.value;
});
htemel.flagWrap.addEventListener("change", (e) => {
    let wasPresent = false;
    if (!receivedData.selectedFlags) {
        receivedData.selectedFlags.push(e.target.value)
    } else {
        for (let i = 0; i < receivedData.selectedFlags.length; i++) {
            if (receivedData.selectedFlags[i] == e.target.value) {
                receivedData.selectedFlags.splice(i, 1);
                wasPresent = true;
            }
        }
        if (!wasPresent) {
            receivedData.selectedFlags.push(e.target.value)
        }
    }
});
htemel.formatWrap.addEventListener("change", (e) => {
    receivedData.selectedFormat = e.target.value
});
