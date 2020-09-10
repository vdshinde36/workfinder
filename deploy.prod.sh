#!/bin/bash
echo "Exceuting deploy.prod.sh for workfinder_backend"
ssh instance-2.us-central1-a.learned-mind-281610  << 'ENDSSH'
cd ~/apecto
echo "directory changed......"
pm2 delete workfinder_backend
sudo rm -Rv workfinder
git clone git@github.com:vdshinde36/workfinder.git
echo "cloning staered from git repository......."
cd workfinder
echo "directory changed......"
ls -ls
npm install
pm2 start ecosystem.config.js --env production
exit
ENDSSH