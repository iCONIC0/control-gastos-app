# This readme is for dockers file

This docker configuration can be used on multiple language projects with Node or PHP.

## Folder Structure
```js
|-project folder
    |-code //folder of your project (laravel , themosis adonis etc)
    |-Dockerfile //file with docker comands execution
    |-docker-compose.yml //file with docker configuration ports and env
    |-vhost.conf //file with apoache config to mount http project

```

## First Step
configure Vhost file ```(this default) ```:
```Html
1 <VirtualHost *:80>
2    DocumentRoot /var/www/html/public
3    <Directory "/var/www/html">
4        AllowOverride all
5        Require all granted
6    </Directory>
7    ErrorLog ${APACHE_LOG_DIR}/error.log
8    CustomLog ${APACHE_LOG_DIR}/access.log combined
9 </VirtualHost>
```
Change line 2 ``` public to htdocs ``` this correspond to root directory for project

## Second Step

Modify the Dcokerfile:

 - Change ```FROM``` to required image language and version
 - Comment or delete ```&& composer self-update --1``` if you want use composer V2  RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer && composer self-update --1
 - Comment the lines if you use Windows or Mac with out Docker desktop:
```docker
3   ARG user
4   ARG uid
## coments this lines blocks for mac or windows    
39 RUN useradd -G www-data,root -u $uid -d /home/$user $user

41 RUN mkdir -p /home/$user/.composer && \
42    chown -R $user:$user /home/$user
##
47 USER $user
```

## Third Step

Modify the *docker-compose.yml* file:

 - Coment the lines if Windows or MAC :
 ```docker
       #comments this lines for mac or windows
7      args:
        #comments this lines for mac or windows
9       user: dev
        #comments this lines for mac or windows
11      uid: 1000
```
 - Change ```network_mode``` to network yo use, use bridge to connect all dockers
 - Change ```ìmage: ``` to set the name for created image :
 ```docker
    image: 'name for your image'
 ```
 - Change ```container_name: ``` to set the name for created container:
 ```docker
    container_name: 'name for your container'
 ```
 - Change ```ports: ``` to set port to listen on local machine:
 ```docker
     ports:
      - 8089:80
      #port number on local machine: if php use 80 as default or set your modified  
 ```
 - Change ```volumes: ``` to set folder of your project:
 ```docker
     volumes:
      - ./code/:/var/www/html
      #set your local path to code poorject: set the same folder of workdirectory on your dockerfile, the same of vhos <Directory "/var/www/html">
 ```
## Finish run this command for build and run detached.
```
docker-compose up --build -d
```