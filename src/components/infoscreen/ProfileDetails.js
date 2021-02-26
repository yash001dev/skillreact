import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { product_Field } from './../../auto/productField';
import{
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles
} from '@material-ui/core';
import { connect } from 'react-redux';
import { ProductCollectionsAddStart } from '../../redux/product/product.actions';
import {createStructuredSelector } from 'reselect';
import { selectCurrentUser } from './../../redux/user/user.selectors';
import useForm from './useForm';
import validateInfo from './validateInfo';
import Accept from './../videouploader/VideoUploader';


const states = [
  {
    value: 'alabama',
    label: 'Alabama'
  },
  {
    value: 'new-york',
    label: 'New York'
  },
  {
    value: 'san-francisco',
    label: 'San Francisco'
  }
];

const useStyles = makeStyles(() => ({
  root: {}
}));

const ProfileDetails = ({ className,userData,addProduct,...rest }) => {
  const classes = useStyles();

  const {values,errors,handleChange,handleSubmit,acceptedFiles,acceptedFilesItems,getRootProps,getInputProps}=useForm(validateInfo,userData,addProduct)


  return (
    <form
      autoComplete="off"
      onSubmit={handleSubmit}
      noValidate
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader
          subheader="The New Product Can Be Inserted"
          title="Product"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Please specify the first name"
                label="Company Name"
                name="companyName"
                onChange={handleChange}
                error={errors.companyName && true}
                helperText={errors.companyName && errors.companyName}
                required
                value={values.companyName}
                variant="outlined"
              />
            </Grid>
            
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Please specify the first name"
                label="Name"
                name="name"
                onChange={handleChange}
                required
                value={values.name}
                variant="outlined"
                error={errors.name && true}
                helperText={errors.name && errors.name}
              />
            </Grid>
            
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Please specify the first name"
                label="Category"
                name="category"
                onChange={handleChange}
                required
                value={values.category}
                variant="outlined"
                error={errors.category && true}
                helperText={errors.category && errors.category}
              />
            </Grid>
            
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Please specify the first name"
                label="Middle Category"
                name="middleCategory"
                onChange={handleChange}
                required
                value={values.middleCategory}
                variant="outlined"
                error={errors.middleCategory && true}
                helperText={errors.middleCategory && errors.middleCategory}
              />
            </Grid>
            
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Please specify the first name"
                label="Sub Category"
                name="subCategory"
                onChange={handleChange}
                required
                value={values.subCategory}
                variant="outlined"
                error={errors.subCategory && true}
                helperText={errors.subCategory && errors.subCategory}
              />
            </Grid>
            
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Please specify the first name"
                label="Price"
                name="price"
                onChange={handleChange}
                required
                value={values.price}
                variant="outlined"
                error={errors.price && true}
                helperText={errors.price && errors.price}
              />
            </Grid>
            
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Please specify the first name"
                label="Size"
                name="size"
                onChange={handleChange}
                required
                value={values.size}
                variant="outlined"
                error={errors.size && true}
                helperText={errors.size && errors.size}
              />
            </Grid>
            
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Please specify the first name"
                label="Weight"
                name="weight"
                onChange={handleChange}
                required
                value={values.weight}
                variant="outlined"
                error={errors.weight && true}
                helperText={errors.weight && errors.weight}
              />
            </Grid>
            
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Please specify the first name"
                label="Color"
                name="color"
                onChange={handleChange}
                required
                value={values.color}
                variant="outlined"
                error={errors.color && true}
                helperText={errors.color && errors.color}
              />
            </Grid>
            
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Please specify the first name"
                label="MRP"
                name="mrp"
                onChange={handleChange}
                required
                value={values.mrp}
                variant="outlined"
                error={errors.mrp && true}
                helperText={errors.mrp && errors.mrp}
              />
            </Grid>
            
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Please specify the first name"
                label="Discount"
                name="discount"
                onChange={handleChange}
                required
                value={values.discount}
                variant="outlined"
                error={errors.discount && true}
                helperText={errors.discount && errors.discount}
              />
            </Grid>

            <Grid item md={12} xs={12}>
          <section className="container">
          {console.log("ACCEPTED FILE:")}
          <div {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select files</p>
            <em>(1 Only image file will be accepted)</em>
          </div>
          <aside>
            <h4>Accepted files</h4>
            <ul>{acceptedFilesItems}</ul>
          </aside>
        </section>
            </Grid>
            
            
          </Grid>
        </CardContent>
        <Divider />
        <Box
          display="flex"
          justifyContent="flex-end"
          p={2}
        >
          <Button
            type="submit"
            color="primary"
            variant="contained"
          >
            Add Product
          </Button>
        </Box>
      </Card>
    </form>
  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string
};

const mapStateToProps=createStructuredSelector({
  userData:selectCurrentUser,
});

const mapDispatchToProps=dispatch=>({
  addProduct:(collection,userId,imageInfo)=>dispatch(ProductCollectionsAddStart(collection,userId,imageInfo))
});

export default connect(mapStateToProps,mapDispatchToProps)(ProfileDetails);