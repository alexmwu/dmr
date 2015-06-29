#!/usr/bin/env bash
rm -r /home/ubuntu/dmr/server/hadoop/reducerOutput/
~/hadoop-2.6.0/bin/hadoop jar ~/hadoop-2.6.0/hadoop-streaming-2.6.0.jar -input hadoop/tmp.txt -output hadoop/reducerOutput/ -mapper hadoop/mapper/map.py -reducer hadoop/reducer/reduce.py

