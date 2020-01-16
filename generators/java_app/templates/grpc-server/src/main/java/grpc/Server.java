package grpc;

import grpc.service.HelloServiceImpl;
import io.grpc.ServerBuilder;
import org.yaml.snakeyaml.Yaml;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Map;
import com.mikudos.grpcclient.Client;
import com.mikudos.broker.Broker;

public class Server {
    public Map config;

    public Server() throws FileNotFoundException {
        this.init();
        System.out.println("server");
    }

    private void init() throws FileNotFoundException {
        //初始化Yaml解析器
        Yaml yaml = new Yaml();
        File f=new File("config/default.yaml");
        //读入文件
        this.config = yaml.load(new FileInputStream(f));
        new Client().clientEcho();
        new Broker().echo();
    }

    public void start() throws IOException, InterruptedException {
        io.grpc.Server server = ServerBuilder.forPort((int) this.config.get("port"))
                .addService(new HelloServiceImpl())
                .build();

        System.out.println("Starting server...");
        server.start();
        System.out.printf("Server started at %s!\n",this.config.get("port"));
        server.awaitTermination();
    }
}
