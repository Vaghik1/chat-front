import Echo from 'laravel-echo';
import axios from 'axios';

export default () => {
    const authorizer = (channel) => {
        return {
            authorize: (socketId, callback) => {
                axios(`${process.env.REACT_APP_URL}/broadcasting/auth`, {
                    method: "POST",
                    withCredentials: true,
                    data: {
                        socket_id: socketId,
                        channel_name: channel.name
                    }
                }).then(res => {
                    if (res.data && res.data.auth) {
                        return res.data;
                    } else {
                        throw new Error(`Received ${res.statusCode}`);
                    }
                }).then(data => {
                    callback(null, data);
                }).catch(err => {
                    callback(new Error(`Error calling auth endpoint: ${err}`), {
                        auth: ""
                    });
                });
            }
        };
    }

    const options = {
        broadcaster: 'pusher',
        key: '5aaf1d52717d89797844',
        cluster: 'ap2',
        forceTLS: true,
        authorizer
    };

    return new Echo(options);
};