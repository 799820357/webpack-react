import React,{ useRef } from 'react';
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
    //获取ajax
    let ajData = useAjax({
        // url : '/widget',
        url : 'https://event.games.wanmei.com/m/accumulator/m_xmz/booking/getNum',
        type : 'get',
        // timeout : 1,
        // cache : true,
        dataType : 'jsonp',
        data : {
            ajax : 'json',
            id : 'ad'
        },
        progress(...arg){
            console.log(arg,'progress');
        },
        beforeSend(xhr){
            console.log(xhr,'before');
        },
        success(res,xhr){
            console.log(res,xhr,'success')
        },
        error(res,xhr){
            console.log(res,xhr,'error')
        },
        complete(res,xhr){
            console.log(res,xhr,'complete')
        }
    });
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
        </dl>
    </div>;
};