/* eslint-disable react-hooks/exhaustive-deps */
// import { UserContext } from '../context/user.context';
import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
// phone: string;
// age: number;
// name: string;
interface Istate {
    users: {
        age: number,
        name: string,
        phone: string,
    }[]
}
const User: React.FC = () => {
    const [user, setUser] = useState<Istate["users"]>([]);
    async function getUsers() {
        try {
            const res = await axios.get('http://localhost:3333/user');
            let tempList = await res.data
            setUser(tempList)

        }
        catch (error) { console.log(error); }
    }
    const [usersList, setUsersList] = useState();
    useEffect(() => {
        getUsers();
    }, [])

    return (
        <>
            {user &&
                user.map((u) => (
                    <div className="details">
                        <h2>{u.name}</h2>
                        <h2>{u.phone}</h2>
                        <h2>{u.age}</h2>
                    </div>
                ))
            }
        </>
    )
}
export default User