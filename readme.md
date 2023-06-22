# Village

Village is an application for local community members who wish to stay engaged in their community's issues or wish to let their community know what problem they are experiencing. The app will feature the ability to create an account, your account can then post an issue, if the users issue experiences enough interaction at certain thresholds different options arrive such as locating a government official near you to write a message, creating a petition or creating a protest for your issue. Users will then be able to mainly see issues around their area to know what issues that their community is currently having.

## Team

  - __Product Owner__: Christian Knox-Phillips 
  - __Scrum Master__: Gabriel Inniss
  - __Development Team Members__: Vincent Lamanno, Vinny Antoinne-Fils

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage

#### When you first clone down the application please perform the following steps:

Create a .env file in the root directory to the following enviorment variables


- PG_HOST = The url of your express server
- PG_PORT = The port of your express server
- PG_USER = Your postgresql username
- PG_PASS = Your postgresql password
- PG_DB = = Your postgresql Database name

- SESSION_SECRET = A generated key used for protecting your user cookies

## Requirements

- Node 0.8
- Postgresql 9.1.x

## Development

### Installing Dependencies

From within the root directory:

```sh
npm run kickstart

cd ./Client

npm i
```

### Roadmap

View the project roadmap [here](https://github.com/orgs/Civictech-Village/projects/1/views/1).


## Contributing

See [CONTRIBUTING.md](https://gist.github.com/Knox-Phillips/a892310930697b75aa3aa5f896e44115) for contribution guidelines.


## Style Guide

This project adheres to the [Airbnb Style Guide](https://github.com/airbnb/javascript).
