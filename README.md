# Serverless Typescript Infra Boiler Plate
- This repo is developed using serverless framework with typescript

## Structure Overview
- `app-infra`
    - `database` contains all dynamodb tables declarations
    - `infra` contains all other infra resources
- `src`
    - `lib` (shared between all microservices)
        - `middlewares` contains all middlewares
        - `models` all typescript models
        - `repositories` all repos interacting with database
        - `services` services interacting with repos
        - `utils` utils functions and classes
        - `validators` request validators
    - `users` users micro service

## Stages
- dev
- prod

## Local development
- make sure you have default aws profile with correct credentials
- npm install in `src/lib` and any micro service folder
- cd to any microservice
- `sls offline start`

## Deployment
- make sure you have default aws profile with correct credentials
- npm install in `src/lib` and any micro service folder
- cd to any microservice
### Dev
- `sls deploy`
### Prod
- `sls deploy --stage prod`
