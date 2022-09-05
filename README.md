# pi-sense-node
Raspberry Pi project with Sense HAT and Node.js.

## Installere NGINX på Raspberry Pi

```
sudo apt-get update 
sudo apt-get install nginx 
sudo systemctl start nginx

hostname -I
```

## Installere Node.js og Node Package Manager (NPM) på Raspberry Pi

```
sudo apt-get install nodejs 
sudo apt-get install npm 
sudo npm install -g npm

nodejs -v 
npm -v
```

## Lav folder til vores projekt på Raspberry Pi og installer Express i projektet

```
mkdir server && cd server
npm init -y
npm install express --save
touch index.js
```

```
const express = require("express"); 
const app = express(); 

app.get("/", (req, res) => { 
	res.send("Hello from Node.js!"); 
}); 

const port = process.env.PORT || 3000;
app.listen(port, () => { 
	console.log(`App listening on http://localhost:${port}`);
});
```

## Kør vores applikation fra Terminalen

```
nodejs index.js
```

## Konfigurere NGINX server til localhost:3000

```
sudo nano /etc/nginx/sites-enabled/default 
```

```
server { 
	listen 80 default_server; 
	listen [::]:80 default_server; 

	root /var/www/html; 

	index index.html index.htm index.nginx-debian.html; 

	server_name _; 

	location / { 
		proxy_pass http://localhost:3000; 
		proxy_http_version 1.1; 
		proxy_set_header Upgrade $http_upgrade; 
		proxy_set_header Connection 'upgrade’; 
		proxy_set_header Host $host; 
		proxy_cache_bypass $http_upgrade; 
	} 
}
```

Afslut med CTRL+X og Y for ja.

## Restart NGINX server bagefter

```
sudo systemctl restart nginx
```

## Installer IPtables og opsæt IP regler for sikkerhed på port 3000

```
sudo apt-get install iptables 

sudo iptables -A INPUT -p tcp -s localhost --dport 3000 -j ACCEPT 
sudo iptables -A INPUT -p tcp --dport 3000 -j DROP
```

## Installer dependencies for programkoden i projektet

```
sudo npm install nodeimu
sudo npm install node-sense-hat
sudo npm install ejs

npm list
```

## Åben filerne index.js, views/index.ejs og assets/style.css i Geany på Raspberry Pi

Hent koden ind fra GitHub repositoriet.
