import { createSelector } from 'reselect';

const selectBrand=state.brand;

export const getLatestBrand=createSelector(
    [selectBrand],
    brand=>brand.collections
)

export const currentLoading=createSelector(
    [selectBrand],
    brand=>brand.isFetching
)