import { logOut } from '../pages/api/auth/auth-service';
import React, { useState } from 'react';
import { useRouter } from 'next/router'
import { ToDo } from '../model/to-do.model';
import ClipLoader from "react-spinners/ClipLoader";
import { GetServerSidePropsContext, NextPage, NextPageContext } from 'next';
import nookies from 'nookies';
import { firebaseAdmin } from '../config/firebaseAdmin';

interface Props {
    todo: ToDo[];
}

const Dashboard: NextPage<Props> = ({ todo }) => {
    const [data, setData] = useState(todo as ToDo[]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();


    const fetchData = async () => {
        const result = await fetch(`https://jsonplaceholder.typicode.com/users/1/todos`);
        const fetched = await result.json();
        console.log(fetched);
        setData(fetched);
    }

    const signOut = async () => {
        await logOut();
        router.push('/login');
    }

    return (
        <>
            <div style={{ float: 'right' }}>
                <button onClick={() => signOut()}>Log Out</button>
            </div>

            {
                loading && (
                    <ClipLoader color='orange' loading={loading} size={150} />

                )
            }

            {!loading && (
                <>
                    <button onClick={() => fetchData()}> &gt;&gt; </button>

                    <table>
                        <tbody>
                            <tr>
                                <th>UserId</th>
                                <th>Title</th>
                                <th>Completed</th>
                            </tr>
                            {data && data.map(function (item, i) {
                                return (
                                    <tr key={i}>
                                        <td style={{ textAlign: 'center' }}>{item.userId ? item.userId : ''}</td>
                                        <td>{item.title ? item.title : ''}</td>
                                        <td style={{ textAlign: 'center' }}>{item.completed ? 'Completed' : 'Not Completed'}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>

                </>
            )}
        </>

    );
}


export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
    try {

        const cookies = nookies.get(ctx);
        console.log(cookies);
        const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);

        // the user is authenticated!
        const { uid, email } = token;
        console.log(uid,email);

        // FETCH STUFF HERE!! 
        const result = await fetch(`https://jsonplaceholder.typicode.com/todos`);
        const data = await result.json();
        const toReturn: Props = {
            todo: data
        };

        return {
            props: toReturn,
        };
    } catch (err) {
        console.log(err);

        // either the `token` cookie didn't exist
        // or token verification failed
        // either way: redirect to the login page
        ctx.res.writeHead(302, { Location: '/login' });
        ctx.res.end();

        // `as never` prevents inference issues
        // with InferGetServerSidePropsType.
        // The props returned here don't matter because we've
        // already redirected the user.
        return { props: {} as never };
    }
};


export default Dashboard;
