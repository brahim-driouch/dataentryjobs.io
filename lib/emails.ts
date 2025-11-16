import { EmailVerificationTemplate } from "@/app/components/emails/email-verification-template";
import { render } from "@react-email/render";
import { Resend } from "resend";

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY!);

export const sendEmail = async (email: string, subject: string, message: string) => {
  try {
    const { data, error } = await resend.emails.send({
      from: 'DataEntryJobs.io <support@dataentryjobs.io>', // Or your verified domain
      to: email,
      subject: subject,
      html: message, // Use html for formatted emails
    });

    if (error) {
      console.error('Error sending email:', error);
      throw new Error(`Failed to send email: ${error.message}`);
    }

    console.log('Email sent successfully:', data?.id);
    return data;
  } catch (error) {
    console.error('Unexpected error sending email:', error);
    throw new Error('Failed to send email');
  }
};


export const sendEmailVerificationLink = async (email: string , verificationUrl:string) => {
    const html = await render(EmailVerificationTemplate({verificationUrl}));

    return await sendEmail(email,     'Verify Your Email - DataEntryJobs.io', html);
}