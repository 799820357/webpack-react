import React,{ useEffect, useRef,useState } from 'react';
import useScrollInfo from 'use-scroll-info';
import useElementClientRect from 'use-element-client-rect';
import useAjax from 'use-ajax';
import './index.scss';
export default () => {
    let dom = useRef(null);
    //获取滚动条信息
    let scrollInfo = useScrollInfo(dom,50);
    //获取element位置大小
    let elementClientRect = useElementClientRect(dom,0);
    //ajax
    let [ajaxRes,setAjaxRes] = useState(null);
    //获取ajax
    useAjax({
        url : '/widget',
        type : 'post',
        dataType : 'json',
        data : {
            ajax : 'json',
            id : 'ad'
        }
    },0).then((res) => {
        if(ajaxRes != res){
            setAjaxRes(res);
        } 
    },res => {
        if(ajaxRes != res){
            setAjaxRes(res);
        }
    })
    //样式
    let style = {
        height : 2000,
        width : 2000,
        paddingTop : scrollInfo ? scrollInfo.scrollTop : 0,
        paddingLeft : scrollInfo ? scrollInfo.scrollLeft : 0
    };
    //render
    return <div className = "detail-page" ref={dom}>
        <dl style={style}>
            <dt>这里是详情页</dt>
            <dd>
                滚动条信息：{scrollInfo ? JSON.stringify(scrollInfo) : ''}
            </dd>
            <dd>
                位置，大小信息：{elementClientRect ? JSON.stringify(elementClientRect) : ''}
            </dd>
            <dd>
                ajax信息: {ajaxRes ? JSON.stringify(ajaxRes.payload) : null}
            </dd>
        </dl>
    </div>;
};