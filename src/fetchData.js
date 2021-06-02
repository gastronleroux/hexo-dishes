const url = "https://frosty-wood-6558.getsandbox.com:443/dishes";
const init = {
    headers: {
        'Content-Type': 'application/json'
    },
};

const fetchData = (values, method) => {
    return {dishes: {
        url: url, 
        init: {
            ...init, 
            method: method, 
            body: JSON.stringify(values)}
    }};
}
export default fetchData;