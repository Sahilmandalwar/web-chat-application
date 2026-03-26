import { resendClient, sender } from "../lib/resend.js"
import { createEmailTemplate } from "./emailTemplate.js"



export const sendWelcomeEmail = async(email,name,clientURL) => {
    const {data,error} = await resendClient.emails.send({
        from: `${sender.name} <${sender.email}>`,
        to: email,
        subject: 'Welcome to WebChatApplication!',
        html: createEmailTemplate(name, clientURL)
    })   

    if(error) {
        console.error("Error sending welcome Email", error);
        throw new Error("failed to send welcome email");
    }

    console.log("Welcome email send successfully")
}

