import React from 'react';
import { Box, fade } from '@material-ui/core';
import FolderIcon from '@material-ui/icons/Folder';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(theme => ({
  attachmentCellItem: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: fade(theme.palette.common.dark, 0.05),
    color: theme.palette.text.primary,
    borderRadius: 30,
    marginRight: 12,
    marginBottom: 8,
    padding: '5px 12px',
    '& .MuiSvgIcon-root': {
      fontSize: 18,
    },
  },
}));

const AttachmentCell = ({ attachment }) => {
  const classes = useStyles();
  return (
    <Box className={classes.attachmentCellItem}>
      <FolderIcon />
      <Box mx={2}>{attachment.name} </Box>
      <MoreHorizIcon />
    </Box>
  );
};

export default AttachmentCell;
