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
        updateError("URL not supported");
        return;
    }

    // check if url is included already;

    if (getUrlElem(imgurl) != null) {
        updateError("URL already loaded");

        return;
    }

    var newimg = new Image();
    newimg.src = imgurl;
    newimg.onload = loadImage;

}

function getUrlElem(imgurl) {
    var imgs = $$(".addedimg");
    for (var i = 0; i < imgs.length; i++) {
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
        var hscale = this.height/100;
        this.width = this.width/hscale;
        this.height = this.height/hscale;
    }

    if(this.width > 100) {
        var wscale = this.width/100;
        this.width = this.width/wscale;
        this.height = this.height/wscale;
    }

    $("planarea").appendChild(this);
    updateError(null);


}

function delImage() {
    var imgurl = $("imgurl").value;

    if(!imgurl.match(urlreg)) {
        updateError("URL not supported");

        return;
    }

    var elem = getUrlElem(imgurl);
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
        $('errmsg').style.display == "block";
        return;
    }

    $('errmsg').innerText = "Error : " + errorMsg;
    $('errmsg').style.display == "none";

}