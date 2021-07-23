import { useHistory } from "react-router-dom";

export default function useRouterMethod(){
    const history = useHistory();

    return {
        back:history.back,
        push:history.push
    }
}