import { MongoHelper } from '../server/infra/db/helpers/mongo-helper'
import { Session } from 'next-auth'
interface Props {
  session: Session
}
export const handleSession = async ({ session }: Props): Promise<void> => {
  const { accessToken, name, email } = session.user
  MongoHelper.uri = process.env.MONGO_URL as string
  const accountsCollection = await MongoHelper.getCollection('accounts')
  const account = await accountsCollection.findOne({ email })
  if (!account) {
    await accountsCollection.insertOne({ email, accessToken, username: name })
  } else {
    await accountsCollection.updateOne(
      { email },
      {
        $set: {
          accessToken,
        },
      }
    )
  }
}
