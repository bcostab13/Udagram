import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // Return filtered image
  app.get("/filteredimage", async (req, res) => {
    let { image_url } = req.query;

    if ( !image_url ) {
      return res.status(400)
                .send(`Image url is required`);
    }
    let image_path = await filterImageFromURL(image_url);
    console.info(image_path);
    res.status(200).sendFile(image_path);
    res.on('finish', function() {
      try {
        deleteLocalFiles([image_path]);    
      } catch(e) {
        console.log("error removing ", image_path); 
      }
    });    
    return 0;
  });
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();