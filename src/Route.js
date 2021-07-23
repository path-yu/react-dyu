import BookDetail from '@/page/BookPage/BookDetail';
import BookPage from "./page/BookPage/BookPage";
import DyPage from './page/DyPage/DyPage';
import UserPage from "./page/UserPage/UserPage";
const routes = [
    {
        path:'/',
        exact:true,
        isNeedKeepAlive:true,
        component: DyPage
    },
    {
        path:'/book',
        exact: true,
        isNeedKeepAlive:true,
        component:BookPage
    },
     {
         path: '/bookdetail/:id',
         exact: true,
         component: BookDetail,
         isNeedKeepAlive: false,
     },
    {
        path:'/user',
        exact:true,
        isNeedKeepAlive:true,
        component:UserPage
    },
    
]

export default routes;