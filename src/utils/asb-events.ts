import { ServiceBusClient, ServiceBusMessage } from '@azure/service-bus';
import { MessageContent, Sessions, Subject } from '../interface/asb-events';

export async function sendMessage(
  subject: Subject,
  sessionId: Sessions,
  messageContent: MessageContent,
) {
  // console.log(messageContent)
  const serviceBus = new ServiceBusClient(process.env.connectionString);

  const sender = serviceBus.createSender(process.env.topic_name);

  const message: ServiceBusMessage = {
    body: messageContent,
    subject: subject,
    sessionId: sessionId,
  };

  console.log(`Sending message: "${message.body}" to "${sessionId}"`);
  await sender.sendMessages(message);

  await sender.close();
  await serviceBus.close();
}
