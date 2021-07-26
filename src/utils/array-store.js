
import storage from 'good-storage';

export function save(key,items) {
    console.log(items);
    return storage.set(key,items);
}

export function load(key){
    return storage.get(key,[]);
}

export function clear(key) {
    return storage.clear(key)
}