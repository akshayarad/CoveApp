import {Client, Account} from 'react-native-appwrite'

export const client = new Client()
    .setProject('689698fe002ffd327cec')
    .setPlatform('dev.akshaya.cove');

export const account = new Account(client)
// makes a new account and connect to backend 
// use for auth