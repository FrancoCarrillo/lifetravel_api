# Deployment to IBM Cloud Foundry

## IBM Cloud

```
https://cloud.ibm.com/login
```

## Download Cloud Foundry CLI

```
https://github.com/cloudfoundry/cli/releases
```

## Login to IBM Cloud Foundry

```
$ cf login
API endpoint: https://api.us-south.cf.cloud.ibm.com
Email: pcsiebau@upc.edu.pe
Password: YourStrongPasswordHere
```

## Deployment

```
$ npm run build
$ cd dist
$ cf push --no-start

$ cf set-env banking-ddd-nest-ebautista ENVIRONMENT prod
$ cf set-env banking-ddd-nest-ebautista BANKING_DDD_NEST_MYSQL mysql://admin:adminadmin@mysql8.cselj9r9ujlf.us-east-2.rds.amazonaws.com:3306/banking-ddd-nest

$ cf env BANKING_DDD_NEST_MYSQL
$ cf env ENVIRONMENT

$ cf start banking-ddd-nest-ebautista
```

## Tip - Cloud Foundry Environment Variables

```
Strings containing the following characters must be quoted:
:, {, }, [, ], ,, &, *, #, ?, |, -, <, >, =, !, %, @, \.
```