export default data => {
    if(!data){ return data}
    return Object.keys(data).map(key => {
        return `${key}=${data[key]}`
    }).join('&')
}