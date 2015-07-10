config = {}

config.hadoop = {}

config.hadoop.binary = '/home/ubuntu/hadoop-2.6.0/bin/hadoop';  //binary path
config.hadoop.mapper = 'hadoop/mapper/map.py';  // mapper function
config.hadoop.reducer ='hadoop/reducer/reduce.py'; // reducer function
config.hadoop.streaming_jar = '/home/ubuntu/hadoop-2.6.0/hadoop-streaming-2.6.0';  // location of hadoop streaming jar 
config.hadoop.streaming_infile = 'hadoop/tmp.txt';  // input file to hadoop streaming
config.hadoop.streaming_outfile = 'hadoop/reducerOutput/'; // output directory for reducer

config.chunk_size = 50;

module.exports = config;

