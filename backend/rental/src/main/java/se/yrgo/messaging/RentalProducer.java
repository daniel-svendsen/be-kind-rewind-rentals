package se.yrgo.messaging;

import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Component;

@Component
public class RentalProducer {

    private final JmsTemplate jmsTemplate;

    public RentalProducer(JmsTemplate jmsTemplate) {
        this.jmsTemplate = jmsTemplate;
    }

    public void sendMessage(String destination, String message) {
        jmsTemplate.convertAndSend(destination, message);
    }
}
