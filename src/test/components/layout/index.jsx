import React,{useMemo} from 'react';
import './index.scss';
import dynamicComponent from 'dynamic-component';
import useRouter from '../../hooks/router';
export default props => {
    //页面
    let pages = useRouter(import('../../pages'),props);
    //头部
    let header = useMemo(() => {
        let Component = dynamicComponent(import('../header'));
        return <Component {...props}/>
    },[props]);
    //导航
    let nav = useMemo(() => {
        let Component = dynamicComponent(import('../nav'));
        return <Component {...props}/>
    },[props]);
    //render
    return <div className="layout-board">
        <div className="header-board">
            {header}
        </div>
        <div className="content-board">
            <div className="nav-board">
                {nav}
            </div>
            <div className="page-board">
                {pages}
            </div>
        </div>
    </div>
}