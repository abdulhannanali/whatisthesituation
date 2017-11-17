## What is the situtation?

[![Greenkeeper badge](https://badges.greenkeeper.io/abdulhannanali/whatisthesituation.svg)](https://greenkeeper.io/)

This is a simple site which demonstrates a sample use of the awesome HTML5 Geolocation API. It retrieves the geolocation of the user and then based on that geolocation makes request to other APIs.

Live at https://abdulhannanali.github.io/whatisthesituation

### Connecting APIs

The APIs to which this site is making request at the  moment are:
- Google GeoLocation API
- Google StatiC Maps API
- OpenWeatherMap API

Some more APIs will be added to this app.


### Running locally on your computer

To run it locally simple fork and clone this Github repo. After cloning it, you need to do one essential thing. Launch an http server to serve the files somehow. It's necessary because browsers don't allow the HTML5 Location API to work over `file://` protocol. Therefore, it's necessary that you server files over http. 

#### Running an http-server
You can run the http-server in the following way.

If you don't have [node.js](https://nodejs.org) already installed. Install it. This will also install the package manager that comes coupled with node. Now install `http-server` by typing the following command:
```bash
npm install -g http-server
```

After the `http-server` gets installed simple type following in the root of the project folder
```bash
http-server
```

You will be told the port of the server. Go to that port on localhost and congratulations you are now receiving the files, served by your very own setup http-server.

#### Contributions
If you would like to extend in terms of what this project can do, feel free to do so :)

#### FOSSASIA 
This task is done as part of Google CodeIn with [FOSSASIA](https://fossasia.org). FOSSASIA is an open source organization which is playing a major role in promoting open source contributions and development in the Asian region and all over the world. Please check out the website of fossasia at [fossasia.org](http://fossasia.org) and FOSSASIA's github pages at [fossasia.github.io](https://fossasia.github.io)

#### LICENSE

MIT LICNSE. SEE [LICENSE](LICENSE) for more details.
