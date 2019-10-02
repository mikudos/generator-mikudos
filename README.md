# generator-mikudos

> A Yeoman generator for a aggregation of mikudos micro service application
Generate micro service code based on the GRPC Proto file.

## Installation

First you need install [yeoman](http://yeoman.io/).

```bash
npm install -g yo
```

Then install the mikudos generator.

```bash
npm install -g yo generator-mikudos
```

## Usage

Create a directory for your new micro service.

```bash
mkdir my-new-service; cd my-new-service/
```

Generate your protos project for centralised proto file management as services description.

```bash
yo mikudos:protos
```

Generate your service app and follow the prompts.

```bash
yo mikudos
```
