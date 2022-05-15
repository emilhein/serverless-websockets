const { getApigatewaymanagementapi, defaultResponse } = require('./../helpers.js')
const { taskRunner } = require('./../controllers/taskrunner')

module.exports.handler = async (event, context) => {
    try {
        const connectionId = event.requestContext.connectionId;
        const domain = event.requestContext.domainName;
        const stage = event.requestContext.stage;
        const clientInput = event.body
        let apigatewaymanagementapi = getApigatewaymanagementapi({ domain, stage });
        let tasks = ['Task1', 'Task2', 'Task3'] // These are your "dynamic" and asynchronous tasks
        let promises = []
        let params = { connectionId, apigatewaymanagementapi, clientInput }
        tasks.forEach((task, index) => {
            promises.push(taskRunner({ index, task, ...params }))
        })
        await Promise.all(promises)
        return defaultResponse
    } catch (error) {
        console.log('Error occoured -> ', error);
    }
};