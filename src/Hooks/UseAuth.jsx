import { use } from 'react';
import { Authcontext } from '../Context/AuthContext';


const UseAuth = () => {
    const authInfo = use(Authcontext)
    return authInfo
};

export default UseAuth;