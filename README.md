# pi-sense-node
Raspberry Pi projekt med Sense HAT og Node.js.

## Lokalt netværk

navn: KEA_IOT_ROUTER_1

adgangskode: MONSTER1

## Raspberry Pi

hostname: DigiKon_1 til 5

brugernavn: pi

adgangskode: raspberry

Sat op med IP addresserne 192.168.1.121 til 192.168.1.125 på netværket.

Prøv Secure Shell (ssh) fra terminalen på Mac med kommandoen:

```
ssh pi@192.168.1.XXX
```

## Installere NGINX på Raspberry Pi

```
sudo apt-get update 
sudo apt-get install nginx 
sudo systemctl start nginx

hostname -I
```

Prøv at åbne denne IP adresse i en browser (skal være på samme netværk som Raspberry Pi).

## Installere Node.js og Node Package Manager (NPM) på Raspberry Pi

```
sudo apt-get install nodejs 
sudo apt-get install npm 
sudo npm install -g npm

nodejs -v 
npm -v
```

## Lav folder til vores projekt på Raspberry Pi og installer Express i projektet

Kør følgende kommandoer i Terminalen.

```
mkdir server && cd server
npm init -y
npm install express --save
touch index.js
```

Åben filen index.js i programmet Beany under 'Programming' i menuen.

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

Applikationen afsluttes ved at trykke CTRL+C.

## Konfigurere NGINX server til localhost:3000

Skriv følgende i Terminalen.

```
sudo nano /etc/nginx/sites-enabled/default 
```

Indsæt følgende konfiguration for 'location'. Resten er det samme.

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

Afslut ved at trykke CTRL+X og tryk Y for at gemme.

## Restart NGINX server bagefter

```
sudo systemctl restart nginx
```

## Installer iptables og opsæt IP regler for sikkerhed på port 3000

```
sudo apt-get install iptables 

sudo iptables -A INPUT -p tcp -s localhost --dport 3000 -j ACCEPT 
sudo iptables -A INPUT -p tcp --dport 3000 -j DROP

sudo iptables -L
```

## Installer dependencies for programkoden i projektet

Skriv følgende i terminalen og husk at være inde i den rigtige mappe på Raspberry Pi.

```
sudo apt-get install sense-hat
sudo npm install nodeimu
sudo npm install node-sense-hat
sudo npm install ejs

npm list
```

## Åben filerne index.js, views/index.ejs og assets/style.css i Geany på Raspberry Pi

- mkdir laver en ny mappe 
- cd skifter mappe
- touch laver en ny fil
- cd .. går en mappe tilbage

```
mkdir views && cd views
touch index.ejs
cd ..
mkdir assets && cd assets
touch style.css
cd ..
```

Hent koden ind fra GitHub repositoriet og kør projektet.

```
nodejs index.js
```

Applikationen vil nu være tilgængelig gennem IP adressen for Raspberry Pi via NGINX serveren.

Åben IP adressen i en browser.

## Lav CURL request op imod en Application Programming Interface (API)

XXX i IP adressen 192.168.1.XXX skal udskiftes med korrekte sidste tre cifre.

Find IP adressen med:

```
hostname -I
```

Hent sensordata i JSON.

```
curl -X GET http://192.168.1.XXX/data
```

Opret ny sensordata.

```
curl -X POST http://192.168.1.XXX/data
```

Skift LED display.

```
curl -X POST http://192.168.1.XXX/matrix/cross
curl -X POST http://192.168.1.XXX/matrix/heart
curl -X POST http://192.168.1.XXX/matrix/smiley
curl -X POST http://192.168.1.XXX/matrix/clear
```
