import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../config/firebase'
import styles from '../styles/Home.module.css'
import Login from '../pages/login'
import Dashboard from '../pages/dashboard'

const Home: NextPage = () => {
  
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
    else {
      router.push('/login');
    }
  }, [user, loading]);

  return (
    <div className={styles.container}>
      {
        user && (
          <Login/>
        )
      }
      {
        !user && (
          <Dashboard todo={[]}/>
        )
      }
    </div>
  )
}

export default Home;
