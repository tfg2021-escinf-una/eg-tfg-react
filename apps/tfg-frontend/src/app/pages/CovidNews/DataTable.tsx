import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';


const columns: GridColDef[] = [
  { field: 'id', headerName: 'Name', width: 300 },
  { field: 'category', headerName: 'Category', width: 200},
  { field: 'phase', headerName: 'Phase', width: 100},
  { field: 'developerResearcher', headerName: 'Developer / Researcher', width: 300},
  { field: 'funder', headerName: 'Funder', width: 200},
];


export default function DataTable(props: { data: any[]; }) {

  const rows = props.data.map((vac: { trimedName: string; category: string; phase: string; developerResearcher: string; funder: string; }) =>
  // eslint-disable-next-line no-new-object
  new Object({
      id: vac.trimedName,
      category: vac.category,
      phase: vac.phase,
      developerResearcher: vac.developerResearcher,
      funder: vac.funder !== 'undefined' ? vac.funder : 'N/A'
  }))
  return (
    <div style={{ height: 300, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}
