const myFunction = () =>{
    let x = document.getElementById("myFile");
    let txt = "";
    if ('files' in x) {
        if (x.files.length === 0) {
            txt = "Select one or more files.";
        } else {
            for (let i = 0; i < x.files.length; i++) {
                txt += "<br><strong>" + (i+1) + ". File</strong><br>";
                let file = x.files[i];
                if ('name' in file) {
                    txt += "File name: " + file.name + "<br>";
                }
                if ('size' in file) {
                    txt += "File size: " + file.size + " bytes <br>";
                }
            }
        }
    }
    else {
        if (x.value === "") {
            txt += "Select one or more images.";
        }
    }
    document.getElementById("demo").innerHTML = txt;
}