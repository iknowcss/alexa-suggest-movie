# Alexa Movie Suggest Project

The Alexa Skills that will suggest movies based on your mood.

## Getting started

### 1. Clone the repository

```bash
https://github.com/iknowcss/alexa-suggest-movie.git
```

### 2. Provision the Vagrant box

The first time you run this command it will provision your Vagrant box. 
In the future you will start your Vagrant box the same way but it will
take much less time.

**Note**: This will take up to 10 minutes

```bash
vagrant up
```



### 3. Connect to the Vagrant box

```bash
vagrant ssh
```

From this point on you will run all of your development commands from
inside the Vagrant box. This is your development environment.

### 4. Install node dependencies

Run this inside the Vagrant box (see previous step)

```bash
npm install
```

## Development commands

Most of the dev commands should be run inside your Vagrant box

### Connect to your Vagrant box

```bash
vagrant ssh
```

### Build the sample package

This will create a .zip file in `dist/alexa-movie-suggest.zip`

```bash
npm run build
```

### Run tests

```bash
# Single run
npm run test

# Test and then watch for changes
npm run test -- -w
```
