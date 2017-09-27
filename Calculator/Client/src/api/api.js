const api = 'http://localhost:3001'

const headers = {
    'Accept': 'application/json'
};

export const add = (payload) =>  
    fetch(`${api}/add`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then((response) => response.json())

    .then((responseJson) => {
        console.log(responseJson.result);
        return responseJson;
    })
        .catch(error => {
            console.log("This is error"+error);
            return error;
});


export const subtract = (payload) =>  
    fetch(`${api}/subtract`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then((response) => response.json())

    .then((responseJson) => {
        console.log(responseJson.result);
        return responseJson;
    })
        .catch(error => {
            console.log("This is error"+error);
            return error;
});


export const multiply = (payload) =>  
    fetch(`${api}/multiply`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then((response) => response.json())

    .then((responseJson) => {
        console.log(responseJson.result);
        return responseJson;
    })
        .catch(error => {
            console.log("This is error"+error);
            return error;
});


export const divide = (payload) =>  
    fetch(`${api}/divide`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then((response) => response.json())

    .then((responseJson) => {
        console.log(responseJson.result);
        return responseJson;
    })
        .catch(error => {
            console.log("This is error"+error);
            return error;
});