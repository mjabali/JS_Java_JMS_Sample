/**
 * 
 */
package com.kaazing.sample.java.client;

import java.util.Properties;

import javax.naming.Context;
import javax.naming.InitialContext;

import javax.jms.ConnectionFactory;
import javax.jms.*;


/**
 * @author Marcelo
 *
 */
public class MyGatewayJavaClient {

	/**
	 * @param args
	 */
	
	public static void main(String[] args) {
		
		Properties props = new Properties();
		props.put(InitialContext.INITIAL_CONTEXT_FACTORY, "com.kaazing.gateway.jms.client.stomp.StompInitialContextFactory");
		props.put(Context.PROVIDER_URL, "ws://localhost:8001/jms");
		try {
			InitialContext ctx = new InitialContext(props);
			ConnectionFactory connectionFactory = (ConnectionFactory)ctx.lookup("ConnectionFactory");
			Connection connection = connectionFactory.createConnection(null, null);
			Session session = connection.createSession(false, Session.AUTO_ACKNOWLEDGE);
			Topic topic = (Topic)ctx.lookup("/topic/myTopic");
			MessageConsumer consumer = session.createConsumer(topic);
			consumer.setMessageListener(new MessageListener(){
				@Override
				public void onMessage(Message msg){
					try{
						System.out.println("MESSAGE: " + ((TextMessage)msg).getText());
					}catch(JMSException jmse){
						jmse.printStackTrace();
					}
				}
			});
			System.out.println("Starting WebSocket Connection...");
			connection.start();
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
