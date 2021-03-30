/*
 * @Author: 胖子
 * @Date: 2021-03-30 15:37:21
 * @LastEditTime: 2021-03-30 16:46:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \roi-element\roi\hooks\value.js
 */
import {useState} from 'react'
import {checkType} from 'roi-utils'
export default (value,defaultValue) => {
    let [val,setVal] = useState(checkType(value,'undefined') ? defaultValue : value)
    //监听值变化
    if(!checkType(value,'undefined') && value !== val){
        setVal(value)
    }
    return [val,setVal]
}
