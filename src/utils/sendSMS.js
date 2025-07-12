import { Vonage } from '@vonage/server-sdk'
import { config } from 'dotenv'

config()

const vonage = new Vonage({
  apiKey: process.env.VONAGE_API_KEY,
  apiSecret: process.env.VONAGE_API_SECRET,
})

export async function sendSMS({ to, text }) {
  await Vonage.sms
    .send({ to, from: 'Vonage APIs', text })
    .then((resp) => {
      console.log('Message sent successfully')
      console.log(resp)
    })
    .catch((err) => {
      console.log('There was an error sending the messages.')
      console.error(err)
    })
}
