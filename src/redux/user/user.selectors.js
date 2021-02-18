import {createSelector} from 'reselect';

const selectUser=state=>state.user;

export const selectCurrentUser=createSelector(
    [selectUser],
    user=>user.currentUser
)

// export const getuserId=createSelector(
//     [selectUser],
//     user=>user.currentUser?Object.keys(user.currentUser).map(key=>)
// )