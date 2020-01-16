package grpc.service;

import greeter.GreetingServiceGrpc;
import greeter.HelloRequest;
import greeter.HelloResponse;
import io.grpc.stub.StreamObserver;

public class HelloServiceImpl extends GreetingServiceGrpc.GreetingServiceImplBase {
    @Override
    public void greeting(HelloRequest request, StreamObserver<HelloResponse> responseObserver) {
        System.out.println(request);

        String greeting = "Hello there, " + request.getName();

        HelloResponse response = HelloResponse.newBuilder().setGreeting(greeting).build();

        responseObserver.onNext(response);
        responseObserver.onCompleted();
    }
}
