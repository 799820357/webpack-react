import {useEffect,useRef,useCallback,useState} from 'react';
export default (dom,framerate = 100) => {
    //结果
    let [info,setInfo] = useState(null);
    //定时器
    let timer = useRef(null);
    //取消定时器
    let cancelTimer = useCallback(() => {
        if(!timer.current){ return }
        clearTimeout(timer.current);
        timer.current = null;
    });
    //scroll函数
    let scrollEve = useCallback(e => {
        if(timer.current){ return }
        timer.current = setTimeout(() => {
            cancelTimer();
            if(!e.target){ return }
            //更新
            setInfo({
                scrollTop : e.target.scrollTop,
                scrollLeft : e.target.scrollLeft,
                scrollHeight : e.target.scrollHeight,
                scrollWidth : e.target.scrollWidth
            });
        },framerate);
    },[]);
    //初始化加载-卸载
    useEffect(() => {
        //绑定事件
        if(dom.current){
            dom.current.addEventListener('scroll',scrollEve,false);
        }
        return () => {
            if(dom.current){
                dom.current.removeEventListener('scroll',scrollEve,false);
                cancelTimer();
            }
        }
    },[]);
    //返回值
    return info;
}