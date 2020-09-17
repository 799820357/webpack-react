import {useState,useEffect} from 'react';
export default (dom,update = 0) => {
    let [info,setInfo] = useState(null);
    //初始化加载-卸载
    useEffect(() => {
        //绑定事件
        if(dom.current){
            let data = JSON.parse(JSON.stringify(dom.current.getBoundingClientRect()));
            setInfo(data);
        }
    },[update]);
    //返回
    return info;
};