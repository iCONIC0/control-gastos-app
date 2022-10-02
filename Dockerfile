FROM php:8-apache

ARG user
ARG uid

WORKDIR /var/www/html
# cambiar por la ip del equipo
ENV REACT_NATIVE_PACKAGER_HOSTNAME=192.168.4.39 
ENV EXPO_DEVTOOLS_LISTEN_ADDRESS=0.0.0.0
RUN apt-get update && apt-get install -y \
        libpng-dev \
        zlib1g-dev \
        libxml2-dev \
        libzip-dev \
        libonig-dev \
        zip \
        curl \
        unzip \
        git \
        redis-server 
    # && docker-php-ext-configure gd \
    # && docker-php-ext-install -j$(nproc) gd \
    # && docker-php-ext-install pdo_mysql \
    # && docker-php-ext-install mysqli \
    # && docker-php-ext-install soap \
    # && docker-php-ext-install zip \
    # && docker-php-source delete

RUN curl https://deb.nodesource.com/setup_14.x | bash
RUN curl https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list 

RUN apt-get update && apt-get install -y nodejs yarn
RUN yarn global add expo-cli
#Commnent this line to node apps
# COPY vhost.conf /etc/apache2/sites-available/000-default.conf

##coment self update to use composer 2
# RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer 
##\
##&& composer self-update --1
## coments this lines blocks for mac or windows    
RUN useradd -G www-data,root -u $uid -d /home/$user $user

RUN mkdir -p /home/$user/.composer && \
    chown -R $user:$user /home/$user
##
RUN chown -R www-data:www-data /var/www/html \
    && a2enmod rewrite
## coments this lines blocks for mac or windows    
USER $user
##run this command for build and run detached
##docker-compose up --build -d