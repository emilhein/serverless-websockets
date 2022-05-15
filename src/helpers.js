const AWS = require("aws-sdk")
// const callbackUrlForAWS = 'http://localhost:3001'; //construct the needed url
const util = require('util')



const sendMessageToClient = (connectionId, payload, apigatewaymanagementapi) => {
    console.log('posting to ', connectionId, ' recieved  ', payload);
    return new Promise((resolve, reject) => {
        let postOptions = {
            ConnectionId: connectionId, // connectionId of the receiving ws-client
            Data: JSON.stringify(payload),
        };

        apigatewaymanagementapi.postToConnection(postOptions, (err, data) => {
            if (err) {
                console.log('err is', err);
                reject(err);
            }
            resolve(data);
        });
    });
};

const getApigatewaymanagementapi = ({ stage, domain }) => {
    const callbackUrlForAWS = util.format(util.format('https://%s/%s', domain, stage));
    //construct the needed url
    // const callbackUrlForAWS = util.format(util.format('https://%s/%s', domain, stage)); //construct the needed url
    let endpoint =
        process.env.NODE_ENV !== 'production' ?
        'http://localhost:3001' :
        callbackUrlForAWS;
    console.log('Endpoint: ', endpoint);
    const apiVersion = '2018-11-29';
    const apigatewaymanagementapi = new AWS.ApiGatewayManagementApi({
        apiVersion,
        endpoint,
    });
    return apigatewaymanagementapi;
};


const defaultResponse = {
    statusCode: 200,
    body: JSON.stringify({ msg: 'OK' }) /*required on lambda proxy integration*/ ,
};


module.exports = {
    getApigatewaymanagementapi,
    sendMessageToClient,
    defaultResponse
}