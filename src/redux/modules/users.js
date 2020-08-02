const SET_PROFILE = 'SET_PROFILE';
const SET_IS_AUTH = 'SET_IS_AUTH';
const SET_USERS = 'SET_USERS';

export function setProfile(payload) {
    return {
        type: SET_PROFILE,
        payload
    }
}

export function setIsAuth(payload) {
    return {
        type: SET_IS_AUTH,
        payload
    }
}

export function setUsers(payload) {
    return {
        type: SET_USERS,
        payload
    }
}

const initialState = {
    profile: null,
    isAuth: null,
    users: null
};

export default function reducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case SET_PROFILE:
            return Object.assign(
                {},
                state,
                {
                    profile: payload,
                    isAuth: payload ? true : false
                }
            );

        case SET_IS_AUTH:
            return Object.assign(
                {},
                state,
                {
                    isAuth: payload
                }
            );

        case SET_USERS:
            return Object.assign(
                {},
                state,
                {
                    users: payload
                }
            );

        default:
            return state;
    }
}