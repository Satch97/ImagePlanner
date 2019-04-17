let urlreg = new RegExp("^(http(s?):)([/|.|\\w|\\s|-])*\\.(?:jpg|gif|png|jpeg)$");

window.onload = function()
{
    $("addbut").onclick= addImage;
    $("delbut").onclick= delImage;
};

function addImage() {
    var imgurl = $("imgurl").value;

    // Adpted and Improved from reference : https://regexr.com/3g1v7
    if(!imgurl.match(urlreg)) {
        alert("Bad URL");
        return;
    }

    var newimg = new Image();
    newimg.src = imgurl;
    newimg.onload = loadImage;

}


function loadImage() {

    this.classList.add("addedimg");
    if(this.height > 100) {
        var hscale = this.height/100;
        this.width = this.width/hscale;
        this.height = this.width/hscale;
    }

    if(this.width > 100) {
        var wscale = this.width/100;
        this.width = this.width/wscale;
        this.height = this.width/wscale;
    }

    $("planarea").appendChild(this);
    // hide err message if any

}

function delImage() {

}