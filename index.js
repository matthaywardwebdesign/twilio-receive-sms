/* Include dependencies */
const express = require( 'express' ) ;
const bodyParser = require( 'body-parser' );
const twilio = require( 'twilio' );

/* Define constants */
const LISTEN_PORT = 3333;

/* Create a new web server */
const app = express();

/**
* Set up the body parser so we can read the data Twilio sends us
* (both JSON and url encoded bodies)
*/
app.use( bodyParser.json());
app.use( bodyParser.urlencoded({ extended: true }));

/* Setup a default route for health check purposes */
app.get( '/', ( req, res ) => {
  res.json({ healthy: true });
});

/* Setup the route that will receive incoming SMS's */
app.post( '/incoming-sms', ( req, res ) => {
  /**
  * Get the response data
  * Body | The SMS body data (longer messages should be combined)
  * From | The number of the person who sent the message (in E164 format)
  * To | The number this SMS was received on
  */
  const { Body, From, To } = req.body;

  /* Do something with the data you receive here */
  
  /**
  * Create the response back to Twilio. You can do stuff like send messages
  * in response here as well. Example here:
  * - https://www.twilio.com/docs/sms/quickstart/node
  */
  const twiml = new twilio.twiml.MessagingResponse();

  /* We are not sending anything back just yet so we'll leave this empty */

  /* Twilio responses are always XML so set the content type and return */
  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(twiml.toString());
});

/* Listen on the desired port */
app.listen( LISTEN_PORT, () => {
  console.log( `App is now listening on port ${LISTEN_PORT}` );
});
