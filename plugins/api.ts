export default defineNuxtPlugin(() => {
    // const options = {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Accept': 'application/json',
    //     }
    // };

    return {
        provide: {
            hello: (msg: string) => {
                console.log(msg)
            },

            sendPost: async (token: any, msg: string) => {
                const options = {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token.value}`,
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    body: JSON.stringify({
                        "title": msg,
                    })
                };
                await fetch("http://localhost:8001/posts", options)
            },

            getPost: async (token: any): Promise<any> => {
                const options = {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token.value}`,
                        'Content-Type': 'application/json',
                    }
                };
                const response = await fetch("http://localhost:8001/posts", options)
                const json = await response.json()
                return json
            },

            getUser: async (token: any): Promise<any> => {
                const options = {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token.value}`,
                        'Content-Type': 'application/json',
                    }
                };

                const response = await fetch("http://localhost:8001/getUser", options)
                const json = await response.json()
                return json
            },

            getUserByUID: async (token: any, uid: any): Promise<any> => {
                const options = {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token.value}`,
                    },
                    body: JSON.stringify({
                        "title": uid,
                    })
                };

                const response = await fetch("http://localhost:8001/getUserByUID", options)
                const json = await response.json()
                return json
            },

            updateUser: async (token: any, text: string): Promise<any> => {
                const options = {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token.value}`,
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    body: JSON.stringify({
                        "name": text,
                    })
                };

                const response = await fetch("http://localhost:8001/userUpdate", options)
                const json = await response.json()
                return json
            },

            updateImg: async (token: any, file: any): Promise<any> => {
                const formData: any = new FormData();
                formData.append("file", file);

                const options = {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token.value}`,
                        // 'Content-Type': 'multipart/form-data; boundary=------------------------',
                    },
                    body: formData
                };

                const response = await fetch("http://localhost:8001/updateIcon", options)
                const json = await response.json()
                return json
            }

        }
    }
})