const { sendMessageToClient } = require('./../helpers.js')
const taskRunner = ({ task, clientInput, index, connectionId, apigatewaymanagementapi }) => {
    return new Promise((resolve, reject) => {
        sendMessageToClient(connectionId, `Stating ${task} --->  (${clientInput})`, apigatewaymanagementapi);
        setTimeout(() => {
            sendMessageToClient(connectionId, `Ending ${task} <--- (${clientInput})`, apigatewaymanagementapi);

            resolve()
        }, index * 2000)
    })
}

module.exports = { taskRunner }