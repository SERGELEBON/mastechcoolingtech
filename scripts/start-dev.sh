#!/bin/bash
# Persistent dev server launcher — fully detaches the Next.js dev server
# from the shell so it survives parent process exit.
cd /home/z/my-project

# Make sure no previous instance is still around
pkill -f "next dev" 2>/dev/null
pkill -f "next-server" 2>/dev/null
sleep 2

# Truncate log
: > /home/z/my-project/dev.log

# Use setsid + nohup to fully detach
setsid nohup ./node_modules/.bin/next dev -p 3000 > /home/z/my-project/dev.log 2>&1 < /dev/null &
DEV_PID=$!
echo "$DEV_PID" > /home/z/my-project/dev.pid
disown $DEV_PID 2>/dev/null || true

echo "Dev server started with PID $DEV_PID"
echo "Log: /home/z/my-project/dev.log"
