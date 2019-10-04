import os
import yaml


def config_test(filename):
    with open(filename, 'r') as f:
        return yaml.load(f, Loader=yaml.FullLoader)


filename = './configs/%s.yaml' % ('default')
Config = config_test(filename)

env_dist = os.environ
if env_dist.get('PYTHON_ENV'):
    filename = './configs/%s.yaml' % (env_dist['PYTHON_ENV'])
    additional = config_test(filename)
    if additional:
        Config = dict(Config, **additional)
