# angular-php-mix
This application uses mysql as database.

# Getting Started
To use it rightaway and test things out,
i suggest to create the database like so:

```
CREATE DATABASE `angular_php`;

USE `angular_php`;

CREATE TABLE IF NOT EXISTS `cars` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `model` varchar(255) NOT NULL DEFAULT '',
  `price` int (10) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;
```

Since i used XAMPP, you can clone this project into your "htdocs"-folder 
and you're good to go.

Make sure to adjust `conf.php`

# Important
Inside the angular-app change the baseUrl to *your backend url* 

In my case it was `http://localhost/angular-php-mix/php`
