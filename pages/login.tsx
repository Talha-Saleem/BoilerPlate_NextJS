import { useEffect, useState } from 'react';
import { login, registerWithEmailAndPassword } from '../pages/api/auth/auth-service';
import { useRouter } from 'next/router'
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from '../config/firebase';


function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const router = useRouter();

    const signIn = async () => {
        const loggedIn = await login(email, password);
        if (loggedIn) {
            router.push('/dashboard');
        }
    }

    return (
        <div className="row">
            <div className="col">
                <input onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Email" type="email"></input>
                <input onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Password" type="password"></input>
            </div>
            <div className="row" style={{ marginTop: '15px' }}>
                <button onClick={() => signIn()}>Log In</button>
                <button onClick={() => registerWithEmailAndPassword(email, password)}>Sign up</button>
            </div>
        </div>
    );
}

export default Login;
