# Udagram Image Filtering Microservice

Udagram is a simple cloud application developed alongside the Udacity Cloud Engineering Nanodegree. It allows users to register and log into a web client, post photos to the feed, and process photos using an image filtering microservice.

The project is split into three parts:
1. [The Simple Frontend](https://github.com/udacity/cloud-developer/tree/master/course-02/exercises/udacity-c2-frontend)
A basic Ionic client web application which consumes the RestAPI Backend. [Covered in the course]
2. [The RestAPI Backend](https://github.com/udacity/cloud-developer/tree/master/course-02/exercises/udacity-c2-restapi), a Node-Express server which can be deployed to a cloud service. [Covered in the course]
3. [The Image Filtering Microservice](https://github.com/udacity/cloud-developer/tree/master/course-02/project/image-filter-starter-code), the final project for the course. It is a Node-Express application which runs a simple script to process images. [Your assignment]

## Setup and Main Feature

### Setup Node Environment

Open a new terminal within the project directory and run:

1. Initialize a new project: `npm i`
2. run the development server with `npm run dev`

### New endpoint in the server.ts file

I added to the starter code an endpoint in `./src/server.ts` which uses query parameter to download an image from a public URL, filter the image, and return the result.


```typescript
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
```

### Deploying system

This project was deploy in a AWS Elastibeanstalk with `eb init`, `eb create` and `eb deploy` commands.
