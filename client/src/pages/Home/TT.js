import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getGen } from '../../store/actions/getGen';
import { Grid } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/styles';
import MUIDataTable from 'mui-datatables';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { Chip } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  tableOverflow: {
    overflow: 'auto',
  },
}));

var getMuiTheme = () =>
  createMuiTheme({
    overrides: {
      MUIDataTableBodyCell: {
        root: {},
      },
    },
  });

function test(labelValue) {
  // Nine Zeroes for Billions
  let isNegative = false;
  if (labelValue < 0) {
    isNegative = true;
  }
  let result =
    Math.abs(Number(labelValue)) >= 1.0e9
      ? (Math.abs(Number(labelValue)) / 1.0e9).toFixed(2) + ' B'
      : // Six Zeroes for Millions
      Math.abs(Number(labelValue)) >= 1.0e6
      ? (Math.abs(Number(labelValue)) / 1.0e6).toFixed(2) + ' M'
      : // Three Zeroes for Thousands
      Math.abs(Number(labelValue)) >= 1.0e3
      ? (Math.abs(Number(labelValue)) / 1.0e3).toFixed(2) + ' K'
      : Math.abs(Number(labelValue));

  if (isNegative) {
    return '-' + result;
  }
  return result;
}

function numberWithCommas(x) {
  if (!x) {
    return x;
  }
  return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
}

function currencyFormatter(number) {
  // number = number.toFixed(2);
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(number);
}


function trimNumber(number){
  return number.toFixed(2)
}


function Tables({ getGen, data, isLoading }) {
  useEffect(() => {
    getGen();
  }, []);

  const classes = useStyles();
  let ARKG = data.ARKG || [];
  let d1 = [];

  if (ARKG.length > 0) {
    d1 = ARKG[0].dailytransactions;
  }

  const columns = [
    {
      name: 'company',
      label: 'Company',
    },
    {
      name: 'ticker',
      label: 'Ticker',
    },
    {
      name: 'marketvalue',
      label: 'Total Market value',
    },
    {
      name: 'shares',
      label: 'Shares',
      options: {
        sortCompare: (shares) => {
          debugger;
          return (obj1, obj2) => {
            // debugger;
            // let val1 = parseInt(obj1.data, 10);
            // let val2 = parseInt(obj2.data, 10);
            return (obj1.data - obj2.data) * (shares === 'asc' ? 1 : -1);
          };
        },
        customBodyRender: (cost) => {
          return numberWithCommas(cost);
        },
      },
    },
    {
      name: 'transactioncost',
      label: 'Transaction cost',
      options: {
        sortCompare: (transactioncost) => {
          debugger;
          return (obj1, obj2) => {
            console.log(transactioncost);
            console.log(obj1, obj2);
            // let val1 = parseInt(obj1.data, 10);
            // let val2 = parseInt(obj2.data, 10);
            return (obj1.data - obj2.data) * (transactioncost === 'asc' ? 1 : -1);
          };
        },
        customBodyRender: (cost) => {
          return test(cost);
        },
      },
    },
    {
      name: 'sharechangepercentage',
      label: 'Percentage change',
      options: {
        sortCompare: (sharechangepercentage) => {
          debugger;
          return (obj1, obj2) => {
            console.log(sharechangepercentage);
            console.log(obj1, obj2);
            // debugger;
            // let val1 = parseInt(obj1.data, 10);
            // let val2 = parseInt(obj2.data, 10);
            return (obj1.data - obj2.data) * (sharechangepercentage === 'asc' ? 1 : -1);
          };
        },
        hint: 'Sort by amount of hobbies',
        customBodyRender: (hobbies) => {
          hobbies = trimNumber(hobbies) + "%"
          return <Chip label={hobbies} />;
        },
      },
    },
  ];

  let options = {
    responsive: 'standard',
    pagination: false,
    selectableRows: false,
    selectableRowsHeader: data.length > 0,
  };

  return (
    <>
      {d1.length && (
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <MUIDataTable title="Employee List" data={d1} columns={columns} options={options} />
          </Grid>
        </Grid>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  let data = state.api.data;
  return {
    data,
    isLoading: state.api.isLoading,
  };
};

export default connect(mapStateToProps, { getGen })(Tables);
