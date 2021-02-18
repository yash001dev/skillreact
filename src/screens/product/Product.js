import React, { useState,useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import Page from '../../components/Page';
import Toolbar from './Toolbar';
import ProductCard from './ProductCard';
import data from './data';
import { connect,} from 'react-redux';
import { getLatestProduct } from './../../redux/product/product.selectors';
import { createStructuredSelector } from 'reselect';
import { ProductCollectionsList } from './../../redux/product/product.actions';
import { selectCurrentUser } from './../../redux/user/user.selectors';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  productCard: {
    height: '100%'
  }
}));



const Product = ({collections,userData,syncProducts}) => {
  const classes = useStyles();
  const [products] = useState(data);


  useEffect(()=>{
    console.log("USERDATA:",userData.id)
    syncProducts(userData.id)
  },[]);

  return (
    
    <Page
      className={classes.root}
      title="Products"
    >
      <Container maxWidth={false}>
        <Toolbar />
        <Box mt={3}>
          <Grid
            container
            spacing={3}
          >
            {products.map((product) => (
              <Grid
                item
                key={product.id}
                lg={4}
                md={6}
                xs={12}
              >
                <ProductCard
                  className={classes.productCard}
                  product={product}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box
          mt={3}
          display="flex"
          justifyContent="center"
        >
          <Pagination
            color="primary"
            count={3}
            size="small"
          />
        </Box>
      </Container>
    </Page>
  );
};

const mapStateToProps=createStructuredSelector({
  collections:getLatestProduct,
  userData:selectCurrentUser
});

const mapDispatchToProps=dispatch=>({
  syncProducts:(userId)=>dispatch(ProductCollectionsList(userId))
})

export default connect(mapStateToProps,mapDispatchToProps)(Product);