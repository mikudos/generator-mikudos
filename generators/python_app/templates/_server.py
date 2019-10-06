import asyncio
import time
import threading
from services import services
from grpclib.server import Server
from grpclib.utils import graceful_exit
from configs.config import Config
# from broker.consumer import coroutine
# from broker.producer import sendMsg

# generated by protoc


async def main(*, host='0.0.0.0', port=Config['port']):
    # 起协程监听kafka消费
    # loop = asyncio.get_event_loop()
    # tasks = asyncio.gather(coroutine)
    # loop.run_until_complete(tasks)
    #
    server = Server(services.GeneralServices())
    with graceful_exit([server]):
        await server.start(host, port)
        print(f'grpcServer serving on {host}:{port}')
        await server.wait_closed()


if __name__ == '__main__':
    # sendMsg(value=b'88888888888888')
    asyncio.run(main())
