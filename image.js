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


}

function delImage() {

}