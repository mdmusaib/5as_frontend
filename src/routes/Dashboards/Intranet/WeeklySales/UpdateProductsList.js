import React, { useEffect, useState } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Popover from '@material-ui/core/Popover';
import CmtList from '../../../../@coremat/CmtList';
import PerfectScrollbar from 'react-perfect-scrollbar';
import useStyles from './index.style';
import AppCheckbox from '../../../../@jumbo/components/Common/formElements/AppCheckBox';
import { Hidden } from '@material-ui/core';

const ProductItem = ({ item, selectedProducts, addProduct, removeProduct }) => {
  const isProductChecked = () => selectedProducts.some(product => product.id === item.id);
  const [checked, setChecked] = useState(isProductChecked());

  useEffect(() => {
    setChecked(isProductChecked());
  }, [selectedProducts, item]);

  const updateCheckedStatus = event => {
    if (event.target.checked) {
      addProduct(item);
    } else {
      removeProduct(item.id);
    }
  };

  return (
    <Box display="flex" alignItems="center" minWidth={160}>
      <AppCheckbox checked={checked} label={item.name} onChange={updateCheckedStatus} color="secondary" />
    </Box>
  );
};

const UpdateProductsList = ({ selectedProducts, productsList, addProduct, removeProduct }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const classes = useStyles();

  const showProductsList = event => {
    setAnchorEl(event.currentTarget);
  };

  const hideProductsList = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Box>
      <Box ml={{ sm: 1, md: 4 }}>
        <Hidden xsDown>
          <Button onClick={showProductsList}>+ ADD</Button>
        </Hidden>
        <Hidden smUp>
          <IconButton>
            <AddIcon />
          </IconButton>
        </Hidden>
      </Box>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={hideProductsList}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}>
        <Box p={2}>
          <PerfectScrollbar className={classes.updateProductListScrollbar}>
            <CmtList
              data={productsList}
              renderRow={(item, index) => (
                <ProductItem
                  key={index}
                  item={item}
                  selectedProducts={selectedProducts}
                  addProduct={addProduct}
                  removeProduct={removeProduct}
                />
              )}
            />
          </PerfectScrollbar>
        </Box>
      </Popover>
    </Box>
  );
};

export default UpdateProductsList;
