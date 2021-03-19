import { useMemo } from 'react';
export default (className,options) => {
    return useMemo(() => {
        let name = className ? className.trim().split(' ') : [];
        if(typeof options == 'string'){
            name.push(options);
        }else if(typeof options == 'object'){
            Object.keys(options).forEach(key => {
                let index = name.indexOf(key);
                if(options[key] && index < 0){
                    name.push(key);
                }else if(!options[key] && index > -1){
                    name.splice(index,1);
                }
            });
        }
        //是否添加样式
        return name.join(' ')
    },[className,JSON.stringify(options)]);
}