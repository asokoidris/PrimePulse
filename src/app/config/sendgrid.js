import sendGridMail from '@sendgrid/mail';
import keys from '../config/keys';

sendGridMail.setApiKey(keys.email.sendgrid.apiKey);

async function emailTemplate(email, templateId, dynamicTemplateData, sendAt) {
  try {
    const mailOption = {
      to: email,
      from: { email: keys.email.sendgrid.sender, name: 'Dims' },
      sendAt,
      templateId,
      dynamicTemplateData,
    };

    const sentEmail = await sendGridMail.send(mailOption);
    logger.info(`Email successfully sent: ${JSON.stringify(sentEmail)}`);
    return sentEmail;
  } catch (error) {
    logger.error(error.message);
  }
}

export default emailTemplate;
