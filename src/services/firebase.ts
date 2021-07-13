import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { CONVERSATIONS, USERS } from '../constants/collections';

class Firebase {
	async signIn(email: string, password: string) {
		try {
			const { user } = await auth().signInWithEmailAndPassword(email, password);
			return user;
		} catch (error) {
			throw error;
		}
	}

	async registerUser(email: string, password: string) {
		try {
			const { user } = await auth().createUserWithEmailAndPassword(email, password);
			return user;
		} catch (error) {
			throw error;
		}
	}

  async createUser(
    uid: string,
    email: string,
    displayName: string = '',
    phoneNumber: string = '',
    photoURL: string = '',
  ) {
    try {
      await firestore()
        .collection(USERS)
        .add({ uid, email, displayName, phoneNumber, photoURL });
    } catch (error) {
      throw error;
    }
  }

  async fetchUsers(loggedInUserId: string) {
    try {
      const { docs } = await firestore().collection(USERS).where('uid', '!=', loggedInUserId).get();
      return docs;
    } catch (error) {
      throw error;
    }
  }

  async fetchConversation(sourceUserUid: string, targetUserUid: string) {
    try {
      const { docs } =
        await firestore()
          .collection(CONVERSATIONS)
          .where(
            'uid',
            'in',
            [
              `${sourceUserUid}${targetUserUid}`,
              `${targetUserUid}${sourceUserUid}`,
            ])
          .limit(1)
          .get();

      return docs[0];
    } catch (error) {
      throw error;
    }
  }

  async createConversation(sourceUserUid: string, targetUserUid: string) {
    try {
      const conversation =
        await firestore()
          .collection(CONVERSATIONS)
          .doc(`${sourceUserUid}${targetUserUid}`)
          .set({
            uid: `${sourceUserUid}${targetUserUid}`,
            messages: [],
            source_user_uid: sourceUserUid,
            target_user_uid: targetUserUid,
          });

      return conversation;
    } catch (error) {
      throw error;
    }
  }

  async addMessageToConversation(conversationId: string, message: string, senderUid: string) {
    await firestore()
      .collection(CONVERSATIONS)
      .doc(conversationId)
      .update({
        messages: firestore.FieldValue.arrayUnion({
          sender_uid: senderUid,
          message,
          created_at: new Date(),
        }),
      });
  }
}

export default Firebase;
