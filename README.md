# dmr
MapReduce mappers running on web browsers with a reducer in the backend. A basic implementation.

##Setup
Install Hadoop (there are many problems with Hadoop - streaming, anyway, on OSX; it might be easier to install on a *nix machine)

##Usage
Run `node server/wsServer.js` which will start up the app on port 3000. Then, open the example site (example/index.html) in your browser. It will automatically connect to 3000 and begin downloading chunks and running the mapper. You can also open more tabs with the example site and they will download their own chunks and run the mapper. To extend it a little more, you can connect to the server (grab your computer's IP address) on your local network from your phone or another computer to test that this works on those as well. The config.js file contains all the configuration of the app that may need to be changed. The testfile (a book in this case) should not be too big as all reducer output is currently stored in memory.

##Extension Ideas
This implementation currently supports simple text files to do a basic word count MapReduce example. A database connection could be added, for example, to support text/binary data, different mappers/reducers, and jobs. Additionally, utilizing HDFS would be ideal as this currently relies on on app server and emulates Hadoop's file chunking just by splitting the text file and sending text in chunks.
