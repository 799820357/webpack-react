import {ajax} from 'utils';
import {useEffect} from 'react';
export default (options) => {
    
    useEffect(() => {
        ajax(options);
    },[]);
}