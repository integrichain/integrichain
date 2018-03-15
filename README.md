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

### Run the server
`./run`

### Set up the dApp
```
cd dapp
```
```
truffle compile
```

#### Run ganache
Start up your local ethereum blockchain by starting Ganache -> http://truffleframework.com/ganache/

#### Migrate the compiled contracts to the running blockchain
```
truffle migrate
```

#### Metamask
Copy-paste the mneumonic from ganache to set up a metamask account

## Starting the dapp from a fresh state!

Always use the FIRST account in metamask.
(with the same address as the first account in ganache)

1. Restart ganache
2. Run `truffle migrate`
3. In Metamask: go to setttings > Reset Account
4. In Metamask: refresh your connection to the ganache network by clicking on the network URL again in the network selection dropdown.

## After pulling new rails changes
After pulling new changes down, you should always run all pending migrations
that may have been created by new changes:
`bundle exec rails db:migrate`
