import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Typography,
  makeStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
} from '@material-ui/core';
import { Button, CardActionArea } from '@material-ui/core';
import { CardActions } from '@material-ui/core';
import useProductForm from './useProductForm';
import { ProductCollectionDelete } from '../../redux/product/product.actions';
import { connect } from 'react-redux';
import {createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { useLocation, useHistory } from 'react-router-dom';



const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  statsItem: {
    alignItems: 'center',
    display: 'flex'
  },
  statsIcon: {
    marginRight: theme.spacing(1)
  }
}));

const ProductCard = ({ className, product,userData,deleteData,index, ...rest }) => {
  const classes = useStyles();

  const {deleteOpen,deleteHandleClickOpen,deleteHandleClickClose,handleDelete}=useProductForm(userData,deleteData)
  const location=useLocation();
  const history=useHistory();
  const handleUpdate=(index)=>{
    console.log("HISTORY:",history);
    history.push(`${location.pathname}/edit/${index}`)
  }

  return (
    <>
    {/* //Delete Dialogue UI */}
    <Dialog
        open={deleteOpen}
        onClose={deleteHandleClickClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are You Sure You Want to Delete?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={deleteHandleClickClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="primary">
            Delete
          </Button>  
        </DialogActions>
      </Dialog>

    {/* //End Delete Dialogue UI */}


    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
    <CardActionArea>
      <CardContent>
        <Box
          display="flex"
          justifyContent="center"
          mb={3}
        >
          <Avatar
            alt="Product"
            src={product.media}
            variant="square"
          />
        </Box>
        <Typography
          align="center"
          color="textPrimary"
          gutterBottom
          variant="h4"
        >
          {product.name}
        </Typography>
        <Typography
          align="center"
          color="textPrimary"
          variant="body1"
        >
          {product.description}
        </Typography>
      </CardContent>
      </CardActionArea>
      <Box flexGrow={1} />
      <Divider />
      
       
      <CardActions>
        <Button onClick={()=>handleUpdate(product.id)} size="small" color="primary">
          Update
        </Button>
        <Button onClick={()=>deleteHandleClickOpen(product.id)} size="small" color="primary">
          Delete
        </Button>
      </CardActions>
    </Card>



    </>
  );
};

ProductCard.propTypes = {
  className: PropTypes.string,
  product: PropTypes.object.isRequired
};

const mapStateToProps=createStructuredSelector({
  userData:selectCurrentUser,
  
});

const mapDispatchToProps=dispatch=>({
  deleteData:(userId,dataId)=>(dispatch(ProductCollectionDelete(userId,dataId)))
});

export default connect(mapStateToProps,mapDispatchToProps)(ProductCard);