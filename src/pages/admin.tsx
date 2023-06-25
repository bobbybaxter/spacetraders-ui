// Import FirebaseAuth and firebase.
import firebase from 'firebase/compat/app';
import type { NextPage } from 'next';
import StyledFirebaseAuth from '@/components/StyledFirebaseAuth';
import app from '@/contexts/firebase';

const auth = app.auth();

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to /signedIn after sign in is successful.
  // Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: '/',
  // We will display Google as auth providers.
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
};

const Admin: NextPage = () => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center mt-3">
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
    </div>
  );
};

export default Admin;
