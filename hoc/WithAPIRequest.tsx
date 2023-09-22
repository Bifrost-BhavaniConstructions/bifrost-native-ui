import React, {useContext} from 'react';
import axios from 'axios';
import {GlobalContext} from '../context/GlobalContext';

export function withAPIRequest(Component: React.FC) {
    return (props: any) => {
        const globalContext = useContext(GlobalContext);
        const commonAPIRequest = (
            {api, method, params, data, refreshToken, extraHeaders}: any,
            callback: any,
        ) => {
            let token = globalContext.token ? globalContext.token : null;

            let headers = {
                Authorization: `Bearer ${refreshToken ? refreshToken : token}`,
                'Access-Control-Allow-Origin': '*',
                ...extraHeaders,
            };
            let config = {
                method: method,
                url: api,
                headers: headers,
                params,
                data,
            };

            params && (config.data = params);

            axios(config)
                .then(response => {
                  callback(response.data);
                })
                .catch(error => {
                    if (error?.response?.data?.status === 401) {
                        console.log('ERROR:::', error?.response?.data?.status);
                        callback(error?.response?.data?.status);
                    } else {
                        callback(error);
                    }
                });
        };

        return <Component {...props} commonAPIRequest={commonAPIRequest}/>;
    };
}
