package se.yrgo.messaging;

import org.springframework.jms.annotation.JmsListener;
import org.springframework.stereotype.Component;

@Component
public class RentalConsumer {

    @JmsListener(destination = "rental.queue")
    public void receiveMessage(String message) {
        System.out.println("Received message: " + message);
    }
}
