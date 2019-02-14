function getCookieValue(cookieKey: string){
    try{
        let re = new RegExp(`(?:(?:^|.*;\s*)${cookieKey}\s*\=\s*([^;]*).*$)|^.*$`,"");
        let cookieValue:string = document.cookie.replace(re, "$1");
        return cookieValue;
    }catch(e){}
}