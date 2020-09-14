import './index.scss';
import React from 'react';
import {withRouter} from 'react-router-dom';
import useRouter from '../../hooks/router';
export default withRouter(props => {
    //页面
    let pages = useRouter(import('../../pages'),props);
    //render
    return <div className="page-board">
        {pages}
    </div>;
})