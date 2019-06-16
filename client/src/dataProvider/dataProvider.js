import fakeDataProvider from './fdataProvider';
// import fakeDataProvider from 'ra-data-fakerest';
import db from '../db.json';

console.log('database', db);

export const dataProvider = fakeDataProvider(db);

// // in myRestProvider.js
// import { stringify } from 'query-string';
// import {
//     GET_LIST,
//     GET_ONE,
//     CREATE,
//     UPDATE,
//     DELETE,
//     GET_MANY,
//     GET_MANY_REFERENCE,
// } from 'react-admin';
// import axios from 'axios';
// import { response } from 'express';

// // const apiUrl = 'http://localhost:3000/api';
// const apiUrl = '';

// /**
//  * Maps react-admin queries to my REST API
//  *
//  * @param {string} type Request type, e.g GET_LIST
//  * @param {string} resource Resource name, e.g. "posts"
//  * @param {Object} payload Request parameters. Depends on the request type
//  * @returns {Promise} the Promise for a data response
//  */
// export default (type, resource, params) => {
//     let url = '';
//     const options = {
//         headers : new Headers({
//             // Accept: 'application/json',
//             token: localStorage.getItem('token'),
//             username: localStorage.getItem('username'),
//         }),
//     };
//     switch (type) {
//         case GET_LIST: {
//             // const { page, perPage } = params.pagination;
//             // const { field, order } = params.sort;
//             // const query = {
//             //     sort: JSON.stringify([field, order]),
//             //     range: JSON.stringify([
//             //         (page - 1) * perPage,
//             //         page * perPage - 1,
//             //     ]),
//             //     filter: JSON.stringify(params.filter),
//             // };
//             // url = `api/${resource}?${stringify(query)}`;
//             url = `api/data/${resource}`;
//             break;
//         }
//         // case GET_ONE:
//         //     url = `${apiUrl}/${resource}/${params.id}`;
//         //     break;
//         // case CREATE:
//         //     url = `${apiUrl}/${resource}`;
//         //     options.method = 'POST';
//         //     options.body = JSON.stringify(params.data);
//         //     break;
//         // case UPDATE:
//         //     url = `${apiUrl}/${resource}/${params.id}`;
//         //     options.method = 'PUT';
//         //     options.body = JSON.stringify(params.data);
//         //     break;
//         // case UPDATE_MANY:
//         //     const query = {
//         //         filter: JSON.stringify({ id: params.ids }),
//         //     };
//         //     url = `${apiUrl}/${resource}?${stringify(query)}`;
//         //     options.method = 'PATCH';
//         //     options.body = JSON.stringify(params.data);
//         //     break;
//         // case DELETE:
//         //     url = `${apiUrl}/${resource}/${params.id}`;
//         //     options.method = 'DELETE';
//         //     break;
//         // case DELETE_MANY:
//         //     const query = {
//         //         filter: JSON.stringify({ id: params.ids }),
//         //     };
//         //     url = `${apiUrl}/${resource}?${stringify(query)}`;
//         //     options.method = 'DELETE';
//         //     break;
//         // case GET_MANY: {
//         //     const query = {
//         //         filter: JSON.stringify({ id: params.ids }),
//         //     };
//         //     url = `${apiUrl}/${resource}?${stringify(query)}`;
//         //     break;
//         // }
//         // case GET_MANY_REFERENCE: {
//         //     const { page, perPage } = params.pagination;
//         //     const { field, order } = params.sort;
//         //     const query = {
//         //         sort: JSON.stringify([field, order]),
//         //         range: JSON.stringify([
//         //             (page - 1) * perPage,
//         //             page * perPage - 1,
//         //         ]),
//         //         filter: JSON.stringify({
//         //             ...params.filter,
//         //             [params.target]: params.id,
//         //         }),
//         //     };
//         //     url = `${apiUrl}/${resource}?${stringify(query)}`;
//         //     break;
//         // }
//         default:
//             throw new Error(`Unsupported Data Provider request type ${type}`);
//     }

//     return axios.post(url, options)
//         .then(response => {
//             console.log('get data!!!',response)
//             /* Convert HTTP Response to Data Provider Response */
//             /* Covered in the next section */
//             switch (type) {
//                 case GET_LIST:
//                 case GET_MANY_REFERENCE:
//                     // if (!headers.has('content-range')) {
//                     //     throw new Error(
//                     //         'The Content-Range header is missing in the HTTP Response. The simple REST data provider expects responses for lists of resources to contain this header with the total number of results to build the pagination. If you are using CORS, did you declare Content-Range in the Access-Control-Expose-Headers header?'
//                     //     );
//                     // }
//                     return {
//                         data: response,
//                         // total: parseInt(
//                         //     headers
//                         //         .get('content-range')
//                         //         .split('/')
//                         //         .pop(),
//                         //     10
//                         // ),
//                         total: 10,
//                     };
//                 case CREATE:
//                     return { data: { ...params.data, id: response.id } };
//                 default:
//                     return { data: response };
//             }
//         })
//         .catch(e => console.log(e));
// };