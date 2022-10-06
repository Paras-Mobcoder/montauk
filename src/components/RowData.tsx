import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function createData(
  brandOwner: string,
  dataType: number,
  fdcId: number,
  description: string,
  foodNutrients: any[],
  publicationDate: string,
  searchInput?: string,
  publishedDate?: string
) {
  return {
    brandOwner,
    dataType,
    fdcId,
    description,
    foodNutrients,
    publicationDate,
    searchInput,
    publishedDate
  };
}

function Row(props: { row: ReturnType<typeof createData> }) {
  const { row } = props;
  console.log("props.searchInput",props)
  console.log("row",row);
  
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.fdcId}
        </TableCell>
        <TableCell align="right"><p className='italic'>{row.brandOwner}</p></TableCell>
        <TableCell align="right">{row.description}</TableCell>
        <TableCell align="right">{row.publicationDate ? row.publicationDate : row.publishedDate}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
              Nutrients
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell><p className='font-bold'>Name</p></TableCell>
                    <TableCell><p className='font-bold'>Derivation Code</p></TableCell>
                    <TableCell align="right"><p className='font-bold'>Amount</p></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.foodNutrients?.length && row.foodNutrients.map((historyRow, index:number) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {historyRow.name || historyRow.nutrientName}
                      </TableCell>
                      <TableCell>{historyRow.derivationCode}</TableCell>
                      <TableCell align="right"><p className='italic'>{historyRow.amount || historyRow.value}</p></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}


export default function RowData(props:any) {
  console.log(props)
  return (
    <TableContainer component={Paper} className="px-[5vw]">
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell><p className='font-bold text-xl'>ID</p></TableCell>
            <TableCell align="right"><p className='font-bold text-xl'>Brand Owner</p></TableCell>
            <TableCell align="right"><p className='font-bold text-xl'>Description</p></TableCell>
            <TableCell align="right"><p className='font-bold text-xl'>Publication Date</p></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows?.length && props.rows?.map((item:any, index:number) => (
            <Row key={index} row={item} />
          ))}
        </TableBody>
      </Table>
    </TableContainer> 
  );
}
