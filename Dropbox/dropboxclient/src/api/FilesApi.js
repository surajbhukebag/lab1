const api = 'http://localhost:3001'

const headers = {
    'Accept': 'application/json'
};

export const listdir = (payload) =>  
    fetch(`${api}/listdir`, {
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
            console.log("List Dir failed");
            return error;
});


export const fileupload = (payload) =>  
    fetch(`${api}/fileupload`, {
        method: 'POST',
        body: payload,
        contentType: false,
        processData: false
        
    }).then((response) => response.json())

    .then((responseJson) => {
        return responseJson;
    })
        .catch(error => {
            console.log("File Upload failed");
            return error;
    });

export const createFolder = (payload) =>  
    fetch(`${api}/createFolder`, {
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
            console.log("Create Dir failed");
            return error;
    });
