/*
* File Name : image.js
* Description : Control logic for image webpage by accessing
*               the url input and add and delete button
*/

"use strict";

let urlreg =
    new RegExp("^(http(s?):)([/|.|\\w|\\s|-])*\\.(?:jpg|gif|png|jpeg)$");

window.onload = function()
{
    $("addbut").onclick= addImage;
    $("delbut").onclick= delImage;
};

/*
    Validates URL then adds it to planning area
    if it is not there already
 */
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

/*
    Returns corresponding dom element
    to passed url
 */
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

/*
    On image load we can now put the
    dom element in place
 */
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

/*
    Validates URL, finds corresponding dom element
    if it exists, delete it.
 */
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

/*
    update url text on click of image to its
    corresponding url
 */
function updateUrl(){
    $("imgurl").value = this.src;
}

/*
    updates error message,
    hiding the element if there
    is no error
 */
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