import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            marginTop: theme.spacing(2),
        },
    },
}));



function Usepagination({ pagesQuantities, setCurrentPageCallBack }) {

    const handleChange = (event, value) => {
        setCurrentPageCallBack(parseInt(value));
    };

    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Pagination defaultPage={1} count={pagesQuantities} onChange={handleChange} showFirstButton showLastButton />
        </div>)
}

export default Usepagination