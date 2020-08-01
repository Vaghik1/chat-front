import { createSelector } from 'reselect';

const usersDataSelector = (state) => state.users;

export const profileSelector = createSelector(usersDataSelector, payload => payload.profile);
export const isAuthSelector = createSelector(usersDataSelector, payload => payload.isAuth);