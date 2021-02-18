import { createSelector } from 'reselect';

const selectProduct=state=>state.product;

export const getLatestProduct=createSelector(
    [selectProduct],
    product=>product.collections
)