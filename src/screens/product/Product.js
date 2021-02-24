import React, { useEffect } from 'react';
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
import { connect,} from 'react-redux';
import { currentLoading, getLatestProduct } from './../../redux/product/product.selectors';
import { createStructuredSelector } from 'reselect';
import { ProductCollectionsList } from './../../redux/product/product.actions';
import { selectCurrentUser } from './../../redux/user/user.selectors';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  productCard: {
    height: '100%'
  },
  progress:{
    display: 'flex',
    width:'100%',
    height:'60vh',
    justifyContent:'center',
    alignItems:'center'
  }
}));



const Product = ({collections,userData,syncProducts,currentLoading}) => {
  const classes = useStyles();

  useEffect(()=>{
    console.log("USERDATA:",userData.id)
    syncProducts(userData.id)
  },[]);
  // const [products] = useState(data);
  return (

    currentLoading?( <CircularProgress />):(<Page
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
            {collections.map((product) => (
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
    </Page>)

    
  );
};

const mapStateToProps=createStructuredSelector({
  collections:getLatestProduct,
  userData:selectCurrentUser,
  currentLoading:currentLoading,
});

const mapDispatchToProps=dispatch=>({
  syncProducts:(userId)=>dispatch(ProductCollectionsList(userId))
})

export default connect(mapStateToProps,mapDispatchToProps)(Product);