import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, updateProfile } from "firebase/auth";
import './App.css';
import app from "./firebase.init";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';

const auth = getAuth(app);

function App() {

  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState('');
  const [registered, setRegistered] = useState(false);
  const [success, setSuccess] = useState('');
  const [name, setName] = useState('')

  const handleEmailBlur = event => {
    setEmail(event.target.value);
  }
  const handlePassBlur = event => {
    setPass(event.target.value);
  }
  const handleNameBlur = event => {
    setName(event.target.value);
  }


  const handleRegistered = event => {
    setRegistered(event.target.checked)
  }
  const handleOnSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      return;

    }
    if (!/(?=.*?[#?!@$%^&*-])/.test(pass)) {
      setError('Password shoud contain at least one special character!')
      return;
    }


    setValidated(true);
    // when pasword is right with a special character it should not show error!
    setError('');

    //  If user user is registered he will login if not he will do register 
    if (registered) {
      signInWithEmailAndPassword(auth, email, pass)

        // console.log(email, pass)
        .then(result => {
          const user = result.user;
          console.log(user);
          setSuccess('You are successfully Loged in.')
        })
        .catch(error => {
          setError(error.message)
        })

    }
    else {
      createUserWithEmailAndPassword(auth, email, pass)
        .then(res => {
          const user = res.user
          setEmail('');
          setPass('');
          verifyEmail();
          setSuccess('You acount is created! Please verify!')

          console.log(user)
        })
        .catch(error => {
          console.error(error);
          setError(error.message);
        })
    }
    event.preventDefault();

  }

  // Send email verificatin message 
  const verifyEmail = () => {
    sendEmailVerification(auth.currentUser)
      .then(result => {
        console.log('Email verification sent')
      })
  }

  // ResetPassword 
  const handlePasswordReset = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log('Email sent for password reset')
      })
  }

  // Store name in firebase:
  const setUserProfile = () => {
    updateProfile(auth.currentUser, {
      displayName: name
    })
      .then(() => {
        console.log('updating name');
      })
      .catch(error => {

        setError(error.message);
      })
  }
  return (
    <div >
      <div className="registration w-50 mx-auto mt-5">
        <h1 className="text-primary">Please{registered ? ' Login' : ' Register'}</h1>
        <Form noValidate validated={validated} onSubmit={handleOnSubmit}>
          {!registered &&
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Your name</Form.Label>
              <Form.Control onBlur={handleNameBlur} type="text" placeholder="Your name" required />
              <Form.Control.Feedback type="invalid">
                Please provide your name.
              </Form.Control.Feedback>
            </Form.Group>
          }


          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control onBlur={handleEmailBlur} type="email" placeholder="Enter email" required />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
            <Form.Control.Feedback type="invalid">
              Please provide a valid Email.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onBlur={handlePassBlur} type="password" placeholder="Password" required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid Password.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check onChange={handleRegistered} type="checkbox" label="Already Registered?" />
          </Form.Group>
          {/* Show successful and error message */}
          <p className="text-danger">{error}</p>
          <p className="text-success">{success}</p>

          <Button onClick={handlePasswordReset} variant="link">Forgot password?</Button> <br />

          <Button variant="primary" type="submit">
            {registered ? 'Login' : 'Register'}
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default App;
