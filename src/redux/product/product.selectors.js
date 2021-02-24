import { createSelector } from 'reselect';

const selectProduct=state=>state.product;

export const getLatestProduct=createSelector(
    [selectProduct],
    product=>product.collections
)

export const currentLoading=createSelector(
    [selectProduct],
    product=>product.isFetching
)