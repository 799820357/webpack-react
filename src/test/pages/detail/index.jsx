import React,{ useRef } from 'react';
import useScrollInfo from 'use-scroll-info';
import './index.scss';
export default () => {
    let dom = useRef(null);
    //获取滚动条信息
    let scrollInfo = useScrollInfo(dom,50);
    let style = {
        height : 2000,
        width : 2000,
        paddingTop : scrollInfo ? scrollInfo.scrollTop : 0,
        paddingLeft : scrollInfo ? scrollInfo.scrollLeft : 0
    };
    //render
    return <div className = "detail-page" ref={dom}>
        <dl style={style}>
            <dt>这里是详情页:一个滚动条的demo</dt>
            <dd>
                {scrollInfo ? JSON.stringify(scrollInfo) : ''}
            </dd>
        </dl>
    </div>;
};