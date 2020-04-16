# EventZoom

## Setting up a dev environment

### Pre-requisites:
* Have the correct node version set up - we support node 10.x as a rule. 12.x also works, but is not explicitly supported.
* Have MongoDB installed or have a MongoDB Atlas instance
* have the instance's connect string
* ensure you are not using a `+srv` protocol to connect to that instance
* have an s3 bucket with access keys, and a cloudfront URL pointing to that S3 bucket (for now, the details set up in .env should be good enough)
* enable HTTPS for PWA functionality
* Have a REDIS server set up (for now, the details provided in .env should be good enough)
* Have a SAML provider configured that provides a name, email and role attribute (for noe, the defaults should be good enough)
* A disqus instance (for now, a default is provided)
* Have a twilio instance set up (details in .env should be good enough)
* Have a Stripe account set up (Demo details set up in config)
* A bit.ly generic API token (one in config is fine)
* Having set up a Zoom account, its Oauth keys, and whitelisted the server URL (just the normal URL, no suffix)
* **NOTE** If using the provided zoom credentials, log in using `me@hdimitrov.com` and `Qweasd123!` . Zoom will not let me have public access.

### Sample accounts
#### Non SSO-Account:

user@example.org

hello

#### SSO Accounts

comsc-student@hdimitrov.com

comsc-staff@hdimitrov.com (can add events)

qweasd123! is the password for both

### Setting up node
1. Clone the project
2. CD into `node/ `
3. run `npm i` to install dependencies
4. Modify the .env file to contain the values listed above. If any of the configuration options are confusing, they are all used within the `node/config/` folder.
5. Run `npm run seed` to seed your MongoDB database
6. Run `npm start` to start up the project
7. Run tests by running `npm run test`, These tests expect a fully seeded database.

### Setting up react
1. Clone the project
2. cd into `react/`
3. Run `npm i`
4. Configure the `.env.development` env file to match the settings listed above. Those values are used in the `src/config` directory
5. Run `npm start` to start up project
6. Run `npm test` to run the project test suite.


## Setting up a production environment (non-lambda)

### Pre-requisites
* Same as development, but preferably using your own servers/keys for all of the above.
* Having ran through the develop process at least once.
* We recommend changing the `EMAIL_SECRET` as well.

### Deploying node
1. cd into `node/`
2. Modify the `.env` file to match your production requirements.
3. Change the port in `config/server.js` to be 80 instead of 3000 if desired
4. Run `npm run build`
5. Copy the entire project onto your production server.
6. Run `npm run migrate` to create the database for production with no seed data.
7. Run `node dist/src/index.js` inside the folder you copied on your server

### Deploying react
1. cd into `react/`
2. Ensure your configurations for `.env.production` match what you want them to match
3. Run `npm run build`
4. Copy the build directory to a publically accessible folder on a web server


## Setting up a production environment (lambda)

### Pre requisites 
* Have the AWS CLI installed and configured.
* Have the configurations being the same as if deploying on non-lambda
* Ensure that the client url is configured correctly in .env.serverless
* If you do not want to deploy to eu-west-3, ctrl+f for any eu-west-3 instances in node/ and replace them with your desired region.

### Deploying node
1. CD into `node/`
2. Remove the `claudia.json` file. 
3. Run `npm run create-lambda`
4. Modify the secret inside `sendMail.json` to be whatever secret you selected before and point to your lambda.
5. Run `npm run create-email-scheduler` (Can be destroyed with `npm run destroy-email-scheduler`)
6. Run `npm run create-reminder-scheduler` (Can be destroyed with `npm run destroy-reminder-scheduler`)
7. Updating is done by running `npm run update-lambda`


### Deploying react
1. Change the `.env.production` file to point to your lambda function
2. Execute the same steps as above.


## Setting up a gitlab pipeline for develop
You will need to define these env variables on your pipeline runner
1. `AWS_ACCESS_KEY_ID` - from AWS
2. `AWS_SECRET_ACCESS_KEY` - from AWS
3. You may also need to change the s3 bucket to be your s3 bucket


## Future work

### Setting up a gitlab pipeline for production

#### Pre-requisites
Set up the develop pipeline correct

#### Guide

The changes needed to the develop pipeline are removing the `db:drop` command and replacing `npm run seed` with `npm run migrate`. Ensure that pipeline is scoped to `master`. Additionally, you will probably want to create a secondary `claudia.json` file to use for production.


### Setting up an email scheduler if deploying on non-lambda

You will need to ping the `/emails` URL with the parameters described in the `json` set at a regular interval. We highly recommend the lambda approach.

### Creating migrations

In the `node/` project, run `npm run create-migration -- <name>` to create a migration.

Run `npm run create-seeder -- <name>` to create a seeder.