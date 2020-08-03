const SET_PROFILE = 'SET_PROFILE';
const SET_IS_AUTH = 'SET_IS_AUTH';
const SET_USERS = 'SET_USERS';
const SET_CHATING_WITH_ID = 'SET_CHATING_WITH_ID';

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

export function setChatingWithId(payload) {
    return {
        type: SET_CHATING_WITH_ID,
        payload
    }
}

const initialState = {
    profile: null,
    isAuth: null,
    users: null,
    chatingWithId: null
};

export default function reducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case SET_PROFILE:
            return {
                ...state,
                profile: payload,
                isAuth: payload ? true : false
            }

        case SET_IS_AUTH:
            return {
                ...state,
                isAuth: payload
            }

        case SET_USERS:
            return {
                ...state,
                users: payload
            }

        case SET_CHATING_WITH_ID:
            return {
                ...state,
                chatingWithId: payload
            }

        default:
            return state;
    }
}