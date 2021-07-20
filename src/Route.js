import BookPage from "./page/BookPage/BookPage";
import DyPage from './page/DyPage/DyPage';

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
    }
]

export default routes;