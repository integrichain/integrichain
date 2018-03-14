# README

We are using Ruby 2.5 and Rails 5.1.5

## Installation
On first run, you will probably need to:
### Install the dependencies:
`bundle install`
### Create the database:
`bundle exec rails db:create`
### Run all database migrations:
`bundle exec rails db:migrate`

## Set up the dApp
```
cd dapp
```
```
truffle compile
```

## Run ganache
Start up your local ethereum blockchain by starting Ganache -> http://truffleframework.com/ganache/

## Migrate the compiled contracts to the running blockchain
```
truffle migrate
```

## After pulling new rails changes
After pulling new changes down, you should always run all pending migrations
that may have been created by new changes:
`bundle exec rails db:migrate`
