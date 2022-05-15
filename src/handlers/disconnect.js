module.exports.disconnect = async (event, context) => {
  try {
    const connectionId = event.requestContext.connectionId;

    console.log('event DISCONNECT: ', connectionId);
    return {
      statusCode: 200,
      body: JSON.stringify({
        msg: connectionId,
      }) /*required on lambda proxy integration*/,
    };
  } catch (error) {
    console.log('Could not Disconnect');
  }
};
