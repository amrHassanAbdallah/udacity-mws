# Mobile Web Specialist Certification Course
---

## Project Overview

For the **Restaurant Reviews** projects, you will incrementally convert a static webpage to a mobile-ready web application. In **Stage One**, you will take a static design that lacks accessibility and convert the design to be responsive on different sized displays and accessible for screen reader use. You will also add a service worker to begin the process of creating a seamless offline experience for your users. **Stage Two**,Change the data source for your restaurant requests to pull JSON from the server, parse the response and use the response to generate the site UI.
                                                                                                                                                                                                                                                                                                                                                                                                                                               Cache the JSON responses for offline use by using the IndexedDB API.
                                                                                                                                                                                                                                                                                                                                                                                                                                               Follow the recommendations provided by Lighthouse to achieve the required performance targets.
**Stage 3**,Add a form to allow users to submit their own reviews.
            Add functionality to defer submission of the form until connection is re-established.
            Follow the recommendations provided by Lighthouse to achieve the required performance targets.
            .



### Up and running 
you will need to install grunt to minify assets such as images , styles .
to install grunt 

`npm install -g grunt-cli
`

then run grunt in your project directory 

`grunt`

which will run image responsive that will set different sizes of images for different views ,'imagemin' which will compress the images , 'cwebp' which will change the images to webp .

then to serve the application 

Python 2:` python -m SimpleHTTPServer 8000 `

Python 3:` python3 -m http.server 8000`

then you will need the server data provider end points 
which you will find here

https://github.com/udacity/mws-restaurant-stage-3