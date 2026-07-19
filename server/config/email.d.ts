export interface EmailOptions {
  to: string;
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
}

export function sendEmail(options: EmailOptions): Promise<unknown>;
