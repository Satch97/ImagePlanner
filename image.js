"use strict";

let urlreg =
    new RegExp("^(http(s?):)([/|.|\\w|\\s|-])*\\.(?:jpg|gif|png|jpeg)$");

window.onload = function()
{
    $("addbut").onclick= addImage;
    $("delbut").onclick= delImage;
};

function addImage() {
    let imgurl = $("imgurl").value;

    // Adpted and Improved from reference : https://regexr.com/3g1v7
    if(!imgurl.match(urlreg)) {
        updateError("URL not supported");
        return;
    }

    // check if url is included already;

    if (getUrlElem(imgurl) != null) {
        updateError("URL already loaded");

        return;
    }

    let newimg = new Image();
    newimg.src = imgurl;
    newimg.onload = loadImage;

}

function getUrlElem(imgurl) {
    let imgs = $$(".addedimg");
    var i;
    for (i = 0; i < imgs.length; i++) {
        if(imgs[i].src == imgurl) {
            return imgs[i];
        }
    }
    return null;
}

function loadImage() {

    this.classList.add("addedimg");
    this.onclick = updateUrl;
    if(this.height > 100) {
        let hscale = this.height/100;
        this.width = this.width/hscale;
        this.height = this.height/hscale;
    }

    if(this.width > 100) {
        let wscale = this.width/100;
        this.width = this.width/wscale;
        this.height = this.height/wscale;
    }

    $("planarea").appendChild(this);
    updateError(null);


}

function delImage() {
    let imgurl = $("imgurl").value;

    if(!imgurl.match(urlreg)) {
        updateError("URL not supported");

        return;
    }

    let elem = getUrlElem(imgurl);
    if (elem == null)  {
        updateError("Image not found");

        return;
    }

    elem.remove();
    updateError(null);

}

function updateUrl(){
    $("imgurl").value = this.src;
}

function updateError(errorMsg) {
    if (errorMsg == null) {
        $("errmsg").classList.remove("show");
        $("errmsg").classList.add("hide");
        return;
    }

    $("errmsg").innerText = "Error : " + errorMsg;
    $("errmsg").classList.remove("hide");
    $("errmsg").classList.add("show");

}