// https://stackoverflow.com/questions/55688632/aws-api-gateway-websocket-unknownerror
module.exports.connect = async (event, context) => {
  try {
    // const domain = event.requestContext.domainName;
    // const stage = event.requestContext.stage;
    const connectionId = event.requestContext.connectionId;
    // let apigatewaymanagementapi = getApigatewaymanagementapi({ domain, stage })

    // await sendMessageToClient(connectionId, event, apigatewaymanagementapi);
    console.log('event CONNECT: ', connectionId);

    return {
      statusCode: 200,
      body: JSON.stringify({
        msg: connectionId,
      }) /*required on lambda proxy integration*/,
    };
  } catch (error) {
    console.log('Could not connect');
  }
};
