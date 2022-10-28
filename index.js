const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app)
const  puppeteer  = require("puppeteer");

app.get('/*', async (req, res) => {
    const result = await request(req.url);
    res.send(`
    <!DOCTYPE html>
        <html>
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"/>
            <title>took-a-hit-now-im-spinnin</title>
            <meta property="og:site_name" content="Streamable"/>
            <meta property="og:title" content="took-a-hit-now-im-spinnin" />
            <meta name="twitter:title" content="took-a-hit-now-im-spinnin">
            <meta name="description" content="Watch &#34;took-a-hit-now-im-spinnin&#34; on Streamable.">
        
            <meta property="og:type" content="video.other">
            <meta property="og:image" content="${result.image}" />
            <meta property="og:image:secure_url" content="${result.image}" />
            <meta property="og:image:type" content="image/jpeg" />
            <meta property="og:image:width" content="1920">
            <meta property="og:image:height" content="1080">
            <meta property="og:url" content="https://www.tiktok.com${req.url}" />
            <meta property="og:video" content="${result.video}">
            <meta property="og:video:url" content="${result.video}">
            <meta property="og:video:secure_url" content="${result.video}">
            <meta property="og:video:type" content="video/mp4">
            <meta property="og:video:width" content="1920">
            <meta property="og:video:height" content="1080">
                
        </head>
        <body>
            
        </body>
    </html>
`)
})

server.listen(80,()=> {
    console.log(`Listening on port ${80}`);
})




const request = (async (url) => {
    const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(`https://www.tiktok.com${url}`);

  // Wait for the results page to load and display the results.
  const resultsSelector = 'video';
  await page.waitForSelector(resultsSelector);

  // Extract the results from the page.
  const result = await page.evaluate(resultsSelector => {
    const video = document.querySelector(resultsSelector);
    const result = {}
    result.video = video.src;
    result.image = video.parentElement.parentElement.previousElementSibling.src;
    return result;
  }, resultsSelector);
  // Print all the files.
  console.log(result);

  await browser.close();
  return result;
});