# Time Managment Assistant #

Time Managment application based on Python/Flask Backend JWT and a Javascript/React/Redux Front-End with Material UI.

* Python 3.x
* Pytest
* Flask
* React
* Redux
* React-Router 2.0
* React-Router-Redux
* Babel 6
* SCSS processing
* Webpack

### Introduction

A modern Web Application is made up of three main components:
- Front-end;
- Back-end;
- Database;

### Description

To make project well structered we will keep them separate.
A popular and productive technology stack today is a combination of React/Redux for the front-end, Python/Flask for the Backend, 
 and SQLAlchemy as the Python Object Relation Map (ORM) to communicate with your SQL database.

### Install Back-End Requirements

```sh
$ pip install -r requirements.txt
```
 
### Install Front-End Requirements

```sh
$ cd static
$ npm install
```

### Install a database

- Install the free community edition of [MySQL](https://dev.mysql.com/downloads/mysql/) and [MySQL Workbench](https://www.mysql.com/products/workbench/)
- Create Scheme mydatabase
- Add configuration string to file config.py: ```sh mysql+mysqlconnector://root:admin@localhost/mydatabase ```
- Create tables ```sh python manage.py create_db ```

### Run Back-End

```sh
$ python manage.py runserver
```

### Run Front-End

```sh
$ cd static
$ npm start
```

### Run

Open your browser to ```sh http://localhost:3000 ```

10. Enjoy! If you have any questions please send me a message to Nikita.Danilov92@gmail.com


