
import { useState } from 'react';
export default function useEmpty(){
     const [description, setDescription] = useState('数据为空');
     const [image, setImage] = useState('error');
     
     // 处理网络请求发生异常错误
     function handleError(err){
         if (err.message.includes('Network ')) {
             setDescription('网络异常')
             setImage('network')
         } else if (err.message.includes('timeout')) {
             setDescription('请求超时,请下拉刷新试试')
         }
     }
     return {
         description,
         setDescription,
         image,
         setImage,
         handleError
     }
}