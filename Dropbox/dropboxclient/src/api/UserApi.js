const api = 'http://localhost:3001'

const headers = {
    'Accept': 'application/json'
};

export const signup = (payload) =>  
    fetch(`${api}/signup`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then((response) => response.json())

    .then((responseJson) => {
        return responseJson;
    })
        .catch(error => {
            console.log("Sign up Falied with error : "+error);
            return error;
});


export const signin = (payload) =>  
    fetch(`${api}/signin`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then((response) => response.json())

    .then((responseJson) => {
        return responseJson;
    })
        .catch(error => {
            console.log("Sign in Falied with error : "+error);
            return error;
});