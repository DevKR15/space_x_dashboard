import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import moment from 'moment';

import { useQuery, gql } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { Launchesdata } from '../redux/actions';

const GET_LAUNCHES = gql`
  query GetLaunches {
    launches {
      id
      launch_date_local
      launch_date_utc
      launch_site {
        site_id
        site_name
      }
      mission_name
      mission_id
      rocket {
        rocket {
          payload_weights {
            id
            name
          }
        }
        rocket_name
      }
    }
  }
`;

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const columns = [
  { id: 'launch_date_local', label: 'Launch date', minWidth: 170 },
  { id: 'launch_site', label: 'Launch site', minWidth: 100 },
  {
    id: 'mission_name',
    label: 'Mission',
    minWidth: 170,
    align: 'right',
  },
];

function createData(id, launch_date_local, launch_site, mission_name) {
  return { id, launch_date_local, launch_site, mission_name };
}

export default function Launches({ launchId }) {
  const [getLaunchDetails, setLaunchDetails] = useState([]);
  const [getOpen, setOpen] = useState(false);
  const { loading, error, data } = useQuery(GET_LAUNCHES);
  const dispatch = useDispatch();
  const rows = [];

  if (data) {
    dispatch(Launchesdata(data.launches));
  }

  const launches = useSelector((state) => state.launches);

  launches.forEach((element, key) => {
    rows.push(
      createData(
        element.id,
        moment(element.launch_date_local).format('MMM Do YYYY'),
        element.launch_site,
        element.mission_name
      )
    );
  });

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClick = async (row) => {
    setOpen(true);
    launches.map((data) => {
      if (row.id === data.id) {
        setLaunchDetails(data);
      }
      return true;
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
                <TableCell sx={{ display: 'flex', justifyContent: 'center' }}>
                  Details
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="bg-gray-100">
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                      <TableCell
                        sx={{ display: 'flex', justifyContent: 'center' }}
                      >
                        <Button
                          variant="outlined"
                          onClick={() => handleClick(row)}
                        >
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={getOpen}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Launch Details
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Typography gutterBottom>
            {'Launch Date Time : '}
            {moment(getLaunchDetails.launch_date_local).format(
              'MMM Do YYYY h:mm:ss a'
            )}
          </Typography>
          <Typography gutterBottom>
            {'Mission Name : '}
            {getLaunchDetails.mission_name}
          </Typography>
          <Typography gutterBottom>
            {'Rocket Name : '}
            {getLaunchDetails &&
              getLaunchDetails.rocket &&
              getLaunchDetails.rocket.rocket_name}
          </Typography>
          <Typography gutterBottom>
            {'Payloads :- '}
            {getLaunchDetails &&
              getLaunchDetails.rocket &&
              getLaunchDetails.rocket.rocket.payload_weights.map((data) => {
                return (
                  <Typography>
                    {data.id}
                    {' : '}
                    {data.name}
                  </Typography>
                );
              })}
          </Typography>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}
