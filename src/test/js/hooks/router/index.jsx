import dynamicComponent from 'dynamic-component';
import { Route, Redirect, withRouter} from 'react-router-dom';
import React,{useState,useEffect,useRef} from 'react';
export default promise => {
    let isMount = useRef(true);
    let [routers,setRouters] = useState(null);
    //初始化加载
    useEffect(() => {
        //加载
        promise.then(res => {
            if(!isMount.current){ return }
            let defaultPage = null;
            let allPages = Object.keys(res.default).map(key => {
                let item = res.default[key];
                //判断默认页
                if(item.default){
                    defaultPage = <Route path='/' exact render={ r => <Redirect to={'/' + key}/>}/>
                };
                return <Route 
                    key={key} 
                    exact = {true} 
                    strict = {true}
                    path = {'/' + key} 
                    component = { dynamicComponent(import(`../../pages/${item.path}`)) }
                />;
            });
            //更新
            setRouters(
                <>
                    { defaultPage }
                    { allPages }
                </>
            );
        },res => {
            console.warn('error:' + res);
        });
        //卸载
        return () => {
            isMount.current = false;
        }
    },[]);
    //返回
    return routers;
};