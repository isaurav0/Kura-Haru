function checkEmpty(string){
    if(string.length == 0 || string == undefined || string == null)
        return true;
    else{
        for(i in string){
            if(string[i]!=' ')
                return false;
        }
        return true;
    }
}

module.exports = checkEmpty