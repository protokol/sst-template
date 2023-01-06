#Infrastrucutre


## Install

1. `npm install`
2. Make sure you have setup you AWS credentials and installed AWS CLI. After installing AWS CLI, run `aws configure`.
- https://serverless-stack.com/chapters/configure-the-aws-cli.html
- AWS CLI Install: https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html

3. Define Local .env file

For guidance - also check `.env.example`. At the current stage it is enough to `cp .env.example .env`

## Running

1. `npm run start` - for more see package.json or look at SST documentation https://docs.serverless-stack.com/

## Testing

You can run tests locally. But you need to deploy first. So for initial development you always work with `npm run start`.
The API tests are independent and reply on serverless stack being deployed first, so:

1. `npm run deploy-with-output` //to generate cdk-output.json, that contains ApiKeys and settings
2. `npm run test` // to execute tests against infra stack
