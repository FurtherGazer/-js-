function sprint(data, level='log'){
    try{    
        if(level == 'log'){
            console.log(data);
        }else if(level == 'test'){
            console.log(data);
        }else if(level == 'warn'){
            console.log(data);
        }else{
            console.log('Wrong keyWord:',level,'\ndata:',data);
        };
    }catch(err){
        console.log('Function print error!');
    };
};

export {sprint};