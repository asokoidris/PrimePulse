import sendgrid from '../config/sendgrid';

/**
 * @description Email Service class
 */
class EmailService {
  /**
   * @description function to send welcome email
   * @param {Object} data - req body object from the AuthController
   * @return {Object} Returned object
   */
  static async sendWelcomeEmail({ email, name, password }, done) {
    try {
      const templateId = '353453467867787';
      const emailTemplate = await sendgrid(email, templateId, {
        name,
        password,
      });
      logger.info(`Email successfully sent: ${JSON.stringify(emailTemplate)}`);
      return done();
    } catch (error) {
      logger.error(
        `Error occurred with email verification ${JSON.stringify(err)}`
      );
      return error;
    }
  }

  /**
   * @description function to send email verification email
   * @param {Object} data - req body object from the AuthController
   * @return {Object} Returned object
   */
  static async sendEmailVerification({ email, name, otp }, done) {
    try {
      const templateId = '353453467867787';
      const emailTemplate = await sendgrid(email, templateId, {
        name,
        otp,
      });
      logger.info(`Email successfully sent: ${JSON.stringify(emailTemplate)}`);
      return done();
    } catch (error) {
      logger.error(
        `Error occurred with email verification ${JSON.stringify(err)}`
      );
      return error;
    }
  }
}

export default EmailService;
