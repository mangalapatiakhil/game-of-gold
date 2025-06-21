// Your web app's Firebase configuration
const firebaseConfig = {
   apiKey: "AIzaSyCXqJ5EPl1IEsGMEESJUXBHl_b9Ut9D1Js",
  authDomain: "register-3e9e7.firebaseapp.com",
  projectId: "register-3e9e7",
  storageBucket: "register-3e9e7.firebasestorage.app",
  messagingSenderId: "966030543111",
  appId: "1:966030543111:web:d3a40396c0732831ca9da2",
  measurementId: "G-QLFENRR5YG"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

document.getElementById('signInForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Store user data in Firestore
    db.collection("users").add({
        email: email,
        password: password, // Note: In a real application, you should never store passwords in plain text.
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        alert("Sign in successful!");
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
        alert("Error signing in: " + error.message);
    });
});
