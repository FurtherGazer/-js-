function getCookieValue(cookieKey) {
    try {
        var re = new RegExp("(?:(?:^|.*;s*)" + cookieKey + "s*=s*([^;]*).*$)|^.*$", "");
        var cookieValue = document.cookie.replace(re, "$1");
        return cookieValue;
    }
    catch (e) { }
}
