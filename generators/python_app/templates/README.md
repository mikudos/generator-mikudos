# <%=serviceName%>

<%=serviceName%> is a micro service generate with @Mikudos/cli.

this project use Conda or MiniConda as the python Env management Instrument. Please install the Conda first and then install all your dependences in the environment.yml with:
`make init-env`

To activate your Env please use:
`conda activate <%=serviceName%>`

Or maybe you want use your Environment with Conda in your project folder, please read ... to change your Environment to local directory.

To Update your Environment use:
`make env-update`

To remove your Environment use:
`make clean-env`

Before run your service, you need to generate your GRPC definetion file with command:
`make proto-py`

To start your Server use:
`make server`
Or enter this after environment is activated:
`python server.py`

To build your Micro Service into a Docker, use:
`make docker`

To run your docker:
`make docker-run`
