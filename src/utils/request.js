export  function getData(url, params) {
    return fetch(url, {
    }).then(res => res.json());

}
export  function postData(url, data) {
    return fetch(url, {
        body: JSON.stringify(data),
        method: 'POST',
        headers: {
            'user-agent': 'Mozilla/4.0 MDN Example',
            'content-type': 'application/json'
        },
    }).then(res => res.json());
}