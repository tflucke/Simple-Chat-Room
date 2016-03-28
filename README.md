Using Systemd
Setup:
npm install socket.io
mkdir -vp ~/.config/systemd/user
cp -v chatRoom.service ~/.config/systemd/user
systemctl --user daemon-reload

Run:
systemctl --user start chatRoom

Stop:
systemctl --user stop chatRoom


Manual
Setup:
npm install socket.io

Run:
node main.js &

Stop:
kill [pid]
