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
        credentials:'include',
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
        credentials:'include',
        body: payload        
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
        credentials:'include',
        body: JSON.stringify(payload)
    }).then((response) => response.json())

    .then((responseJson) => {
        return responseJson;
    })
        .catch(error => {
            console.log("Create Dir failed");
            return error;
    });


export const fileDelete = (payload) =>  
    fetch(`${api}/fileFolderDelete`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(payload)
    }).then((response) => response.json())

    .then((responseJson) => {
        return responseJson;
    })
        .catch(error => {
            console.log("File Deletion failed");
            return error;
    });


export const getStarredFiles = (payload) =>  
    fetch(`${api}/starredFiles/`+payload, {
        method: 'GET',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include'
    }).then((response) => response.json())

    .then((responseJson) => {
        return responseJson;
    })
        .catch(error => {
            console.log("Get starred files failed");
            return error;
    });

export const generateLink = (payload) =>  
    fetch(`${api}/generateLink`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(payload)
    }).then((response) => response.json())

    .then((responseJson) => {
        return responseJson;
    })
        .catch(error => {
            console.log("File Link creation failed");
            return error;
    });