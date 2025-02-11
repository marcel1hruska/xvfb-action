#!/bin/bash
#author Bret Comnes

kill_xvfb () {
    local xvfb_pids=`ps aux | grep tmp/xvfb-run | grep -v grep | awk '{print $2}'`
    if [ "$xvfb_pids" != "" ]; then
        echo "Killing the following xvfb processes: $xvfb_pids"
        # alpine check
        if [ -f "/etc/alpine-release" ]; then
            kill $xvfb_pids
        else
            sudo kill $xvfb_pids
        fi
    else
        echo "No xvfb processes to kill"
    fi
}

kill_xvfb