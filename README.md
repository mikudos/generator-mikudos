# generator-mikudos

> A Yeoman generator for a aggregation of mikudos micro service application
> Generate micro service code based on the GRPC Proto file.

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

Create a directory for your new mikudos project.

```bash
mkdir my-new-project; cd my-new-project/
```

Generate your project.

```bash
yo mikudos project
```

Generate your service app and follow the prompts.

```bash
yo mikudos
```

Generate your protos project for centralised proto file management as services description.

```bash
yo mikudos:protos
```

Generate your deployment project for helm deployment with centralised deployment file management.

```bash
yo mikudos:deployment
```

Generate your micro service based on one proto file.

```bash
yo mikudos:app
```

or

```bash
yo mikudos app
```

Generate your Golang micro service based on one proto file.

```bash
yo mikudos:golang_app
```

Generate your Golang method in micro service based on your proto file.

```bash
yo mikudos:golang_service
```

Generate your Nodejs micro service with Typescript based on one proto file.

```bash
yo mikudos:ts_app
```

Generate your Typescript methods in micro service based on your proto file.

```bash(with users/users.proto)
yo mikudos:ts_service  --proto=users
```

Generate your Typescript clients in micro service based on your proto file.

```bash(with users/users.proto)
yo mikudos:ts_service --client
```

Or generate in same time.

```bash(with users/users.proto)
yo mikudos:ts_service  --proto=users --client
```

Generate your Nodejs micro service based on one proto file.

```bash
yo mikudos:node_app
```

Generate your Nodejs method in micro service based on your proto file.

```bash
yo mikudos:node_service
```

Generate your Python micro service based on one proto file.

```bash
yo mikudos:python_app
```

Generate your Python ML micro service based on one proto file.

```bash
yo mikudos:python_ai
```

Generate your Python method in micro service based on your proto file.

```bash
yo mikudos:python_service
```

Generate your golang Schedule micro service based on one proto file.

```bash
yo mikudos:schedule
```

Generate your golang EventAggregate micro service based on one proto file.

```bash
yo mikudos:eventAggregate
```

Generate your golang Message micro service based on one proto file.

```bash
yo mikudos:message
```
