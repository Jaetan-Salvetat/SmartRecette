import { Client, Account, Databases } from 'react-native-appwrite'

const client = new Client()

client
  .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT || '')
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID || '')
  .setPlatform('fr.jaetan.smart_recette')

const account = new Account(client)
const database = new Databases(client)

export { client, account, database }

