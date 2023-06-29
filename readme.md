# Village

## Getting Started
Create a .env file in the root directory to the following enviorment variables

```
- PG_HOST = The url of your express server
- PG_PORT = The port of your express server
- PG_USER = Your postgresql username
- PG_PASS = Your postgresql password
- PG_DB = = Your postgresql Database name
- SESSION_SECRET = A generated key used for protecting your user cookies

```
In addition create a cloudinary account and add the following variables to the env file. All of the following information can be found on your cloudinary dash board as soon as you log in.
```
- CLOUDINARY_CLOUD_NAME=""
- CLOUDINARY_API_KEY=""
- CLOUDINARY_API_SECRET=""
- CLOUDINARY_URL=""
- SESSION_SECRET=''
```
Next, sign up for a map box account and create a file inside the client folder called `config.js` and fill out the mapboxAccessToken variable, then export it like below.
```
const config = {  mapboxAccessToken: "YOUR ACCESS TOKEN" };

export default config;

```
and run these commands from within the root directory:
```sh
npm run kickstart

cd ./Client

npm i
```

All set! ;)

## Mission Statement:

Our mission is to facilitate connection between community members, by giving them a platform to connect, discuss, and organize. By empowering individuals to come together, we aim to shift the focus from isolated struggles to collective efforts, enabling them to address common challenges and work towards shared goals.

## Who we serve 

We aim to serve local community members who either just wish to stay in the know about what their community is experiencing or those who want to let their fellow community members know what issues they are experiencing.

## Product Overview

Village is an application for local community members who wish to stay engaged in their community's issues or wish to let their community know what problem they are experiencing. The app will feature the ability to create an account, your account can then post an issue, if the users issue experiences enough interaction at certain thresholds different options arrive such as locating a government official near you to write a message, creating a petition or creating a protest for your issue. Users will then be able to mainly see issues around their area to know what issues that their community is currently having.

## Summary

A study published in the Journal of Personality and Social Psychology found that people were more likely to sign a petition to save a local park if they believed that their neighbors were also concerned about the park's future (APA). Similarly, a study published in the Journal of Consumer Research found that people were more likely to boycott a company if they believed that their friends and family were also boycotting the company (APA).

These studies suggest that social influence can play a powerful role in shaping our willingness to take action on issues that we care about. When we see that others are also concerned about an issue, it can make us feel more confident that our actions will make a difference. It can also help us to feel less alone and more connected to others who share our values.

In any form of change or movement, the people are the most vital piece. Any elected official can just brush off the voice of one person saying they have a problem, but it's a lot harder when you have hundreds or thousands of people rallying behind a common issue. “Community organizing enables people to turn their resources into the power they need to make the change they want (Chow). Power comes from our commitment to work together to achieve a common purpose, and commitment is developed through relationships.” (Open Library)

## Technologies

![image](https://github.com/Civictech-Village/Village-Codebase/assets/114108138/6f578e51-1db4-4458-bc95-47bcd8b4091b)

## ERD

## Key API Endpoints

| Endpoint      | Description | Example     |
| :---        |    :----:   |          ---: |
| `/villages`   | Allows you to see all communities on our website | `GET /villages`     |
| `/issues/:vilageid`   | Allows you to see all issues that a community has        | `GET /issues/:vilageid` |
| `/issues/:vilageid`     | Allows you to see all posts about an issue       |`GET /issues/:vilageid`  |

