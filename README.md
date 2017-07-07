# Sphero Arena

Ce projet consiste en un jeu où deux joueurs possèdent chacun une boule robotique [Sphero](http://www.sphero.com/sphero) 
via leur mobile ils devront ouvrir un navigateur et se connecter à l'adresse sur laquelle le serveur tourne, se connecter
à leurs boules qui seront préalablement placées sur le terrain. Grâce au joystick sur l'interface web ils pourront 
déplacer leurs boules tout en essayant de se tirer dessus virtuellement grâce à un affichage en temps réel sur un écran
auxiliaire. 


## Prérequis 
-  Utilisation de Windows car la connexion à plusieurs sphero en simultané n'était pas fonctionnelle sous Linux
- [Node.js](https://nodejs.org/en/) 
- [Git](https://git-for-windows.github.io/) 

Afin de pouvoir utiliser le paquet serialport qui est utile à la connexion bluetooth il nous est demandé d'installer 
les différentes librairies C++, l'installation de 'Visual Studio Express 2013 for Windows Desktop'.
permettra d'obtenir toutes les librairies nécessaires.

Pour cela il faut ouvrir un powershell en admin
```
Set-ExecutionPolicy Bypass 
iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
choco install visualstudioexpress2013windowsdesktop 
```

# Installation
- Appairer chaque boule au bluetooth de l'ordinateur
- Pour plus de précisions sur les ports bluetooth dans le panneau bluetooth de Windows descendre en bas 
puis paramètres Bluetooth avancés puis onglet Ports COM et noter les ports sortant, c'est ceux-ci qu'on utilise

- Ouvrir Node.js command prompt
```
cd sphero-arena/client
npm install
npm start --public "ip-address"
```
Le serveur frontend démarre sur le port 3000

Puis il faudra lancer le serveur backend qui contrôle la boule robotique
Ouvrir un auter terminal Node.js

```
cd sphero-arena
npm install
npm start
```
Le serveur backend démarre sur le port 8080

La connexion des websockets entre le frontend et le backend se fait grâce à un proxy définit dans le package.json côté client.


# Fonctionnement 
- Vérifier que le serveur frontend et backend sont bien lancés
- Allumer une boule (la boule Serli correspond à COM4 et la boule de Chris correspond à COM6)
- Sur navigateur aller à l'adresse 192.168.86.134:3000
- Cliquer sur le bouton tout en haut de connexion d'une orbe
- Si le backend crash avec l'erreur ERROR PORT NOT OPEN cela vient d'un problème de synchronisation bluetooth
- Dupliquer l'onglet
- Allumer l'autre boule
- Connectez-vous à l'autre boule
- Vous avez maintenant un onglet pour contrôler chaque boule

Le serveur peut crash dû à une mauvaise synchronisation avec la boule au clic sur les boutons de connexion ou lors du
contrôle des boules, parfois des messages de mauvaise synchronisation peuvent apparaître, le système peut rétablir parfois
la connexion avec la boule.


# Reste à faire

Pour le moment on peut faire seulement un tir depuis la position de la boule verte.
Ajouter la possibilité de faire plusieurs tirs avec un délai entre chaque tir
 avec une jauge qui indique quand le prochain tir va être disponible

Toutes les infos sont sur la même page, il faudrait dispatcher en 3 écrans
- un écran de connexion
- l'écran du jeu en temps réel
- l'acran de contrôle avec le joystick 
On pourra utiliser React Router

Éventuellement stocker l'état du canvas et pouvoir avoir une fonction de replay




# Documentation 
[Sphero JS API](https://sdk.sphero.com/community-apis/javascript-sdk/) 
[React-Workshop](https://github.com/react-bootcamp/react-workshop)
## Authors

* **Baptiste Garcin**

## License

This project is licensed under the MIT License