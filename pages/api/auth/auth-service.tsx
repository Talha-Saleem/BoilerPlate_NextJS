
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "../../../config/firebase";

const login = async (email: string, pass: string) => {
    try {
        const res = await signInWithEmailAndPassword(auth, email, pass);
        return true;
    } catch (e: any) {
        return false;
    }
};


const registerWithEmailAndPassword = async (email: string, password: string) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
    } catch (err: any) {
        console.error(err);
        alert(err.message);
    }
};

const logOut = async () => {
    try {
        await auth.signOut();
    } catch (e: any) {
        alert(e.message);
    }
};

export { login, registerWithEmailAndPassword, logOut };
