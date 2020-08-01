const SET_PROFILE = 'SET_PROFILE';

export function setProfile(payload) {
    return {
        type: SET_PROFILE,
        payload
    }
}

const initialState = {
    profile: null,
    isAuth: null
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
                    isAuth: true
                }
            );

        default:
            return state;
    }
}