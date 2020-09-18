export default str => {
    if(!str){ return str }
    str = str.replace(/^\?/,'');
    let result = {};
    str.split('&').forEach(item => {
        let data = item.split('=');
        result[data[0]] = data[1];
    });
    
    return result;
}