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
const auth = firebase.auth();

// Create animated background particles
function createParticles() {
    const bgAnimation = document.querySelector('.bg-animation');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.width = Math.random() * 6 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
        bgAnimation.appendChild(particle);
    }
}

// Toggle password visibility
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleBtn = document.querySelector('.password-toggle');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleBtn.textContent = '🙈';
    } else {
        passwordInput.type = 'password';
        toggleBtn.textContent = '👁️';
    }
}

// Show message function
function showMessage(message, type = 'error') {
    const errorDiv = document.getElementById('errorMessage');
    const successDiv = document.getElementById('successMessage');

    // Hide both messages first
    errorDiv.style.display = 'none';
    successDiv.style.display = 'none';

    if (type === 'error') {
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
    } else {
        successDiv.textContent = message;
        successDiv.style.display = 'block';
    }

    // Auto hide after 5 seconds
    setTimeout(() => {
        errorDiv.style.display = 'none';
        successDiv.style.display = 'none';
    }, 5000);
}

// Handle form submission
document.getElementById('signinForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const signinBtn = document.getElementById('signinBtn');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const btnText = document.getElementById('btnText');

    // Basic validation
    if (!email || !password) {
        showMessage('Please fill in all fields', 'error');
        return;
    }

    if (password.length < 6) {
        showMessage('Password must be at least 6 characters long', 'error');
        return;
    }

    // Show loading state
    signinBtn.classList.add('loading');
    loadingSpinner.style.display = 'inline-block';
    btnText.textContent = 'Signing in...';

    // Sign in with Firebase Authentication
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;

            // Store user data in Firestore
            return db.collection("users").doc(user.uid).set({
                email: user.email,
                lastLogin: firebase.firestore.FieldValue.serverTimestamp()
            });
        })
        .then(() => {
            // Reset button state
            signinBtn.classList.remove('loading');
            loadingSpinner.style.display = 'none';
            btnText.textContent = 'Sign In';

            showMessage('Welcome back! Redirecting...', 'success');
            setTimeout(() => {
                // Redirect to another page or perform other actions
                alert('Sign-in successful! In a real app, you would be redirected to the dashboard.');
            }, 1000);
        })
        .catch((error) => {
            // Reset button state
            signinBtn.classList.remove('loading');
            loadingSpinner.style.display = 'none';
            btnText.textContent = 'Sign In';

            showMessage(error.message, 'error');
        });
});

// Handle social sign-in
function socialSignin(provider) {
    let authProvider;
    if (provider === 'google') {
        authProvider = new firebase.auth.GoogleAuthProvider();
    } else if (provider === 'github') {
        authProvider = new firebase.auth.GithubAuthProvider();
    }

    if (authProvider) {
        auth.signInWithPopup(authProvider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = result.credential;
                // The signed-in user info.
                const user = result.user;

                // Store user data in Firestore
                return db.collection("users").doc(user.uid).set({
                    email: user.email,
                    lastLogin: firebase.firestore.FieldValue.serverTimestamp()
                });
            })
            .then(() => {
                showMessage(`${provider.charAt(0).toUpperCase() + provider.slice(1)} sign-in successful! Redirecting...`, 'success');
                setTimeout(() => {
                    // Redirect to another page or perform other actions
                    alert('Social sign-in successful! In a real app, you would be redirected to the dashboard.');
                }, 1000);
            })
            .catch((error) => {
                showMessage(error.message, 'error');
            });
    }
}

// Add input animations
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'scale(1.02)';
    });

    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'scale(1)';
    });
});

// Initialize particles on page load
document.addEventListener('DOMContentLoaded', function() {
    createParticles();
});

// Add subtle parallax effect to container
document.addEventListener('mousemove', function(e) {
    const container = document.querySelector('.container');
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;

    container.style.transform = `translateX(${(x - 50) * 0.02}px) translateY(${(y - 50) * 0.02}px)`;
});
