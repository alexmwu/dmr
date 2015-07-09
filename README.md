# dmr
MapReduce mappers running on web browsers with a reducer in the backend. A basic implementation.

##Setup
Install Hadoop (there are many problems with Hadoop - streaming, anyway, on OSX; it might be easier to install on a *nix machine)

##Usage
This implementation currently supports simple text files to do a basic word count MapReduce example. A database connection could be added, for example, to support text/binary data, different mappers/reducers, and jobs.
