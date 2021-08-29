import { clear, load, save } from '@/utils/array-store';
import { SEARCH_KEY } from '@/utils/constance';
import { action, observable } from 'mobx';

const appState = observable({
    searchHistoryList: load(SEARCH_KEY)
});

export const addSearchHistory = (val) => {
    action(() => { 
        // 判断是否已经存在了对应的搜索记录
        if (!appState.searchHistoryList.includes(val)) {
            appState.searchHistoryList.push(val);
            save(SEARCH_KEY, [...appState.searchHistoryList]);
            return true
        }
        return false;
    })()
};
export const clearSearchHistory = () => {
    action(() => {
        if(appState.searchHistoryList.length){
            appState.searchHistoryList = [];
            clear(SEARCH_KEY)
        }
    })()
}
export default appState;