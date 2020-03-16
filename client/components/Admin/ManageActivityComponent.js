import React from "react";
import MaterialTable from "material-table";
import AccessTimeIcon from "@material-ui/icons/AccessTime";

export default function ActivityTableComponent() {
  const [state, setState] = React.useState({
    columns: [
      { title: "Activity", field: "activity" },
      { title: "Description", field: "description" }
    ],
    data: [
      { activity: "Mehmet", description: "Baran" },
      {
        activity: "Zerya Betül",
        description: "Baran"
      }
    ]
  });

  return (
    <MaterialTable
      title="Editable Example"
      columns={state.columns}
      data={state.data}
      actions={[
        {
          icon: () => <AccessTimeIcon />,
          tooltip: "Save User",
          onClick: (event, rowData) => alert("You saved " + rowData.name)
        },
        rowData => ({
          icon: "delete",
          tooltip: "Delete User",
          onClick: (event, rowData) =>
            confirm("You want to delete " + rowData.name),
          disabled: rowData.birthYear < 2000
        })
      ]}
      options={{
        actionsColumnIndex: -1
      }}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              setState(prevState => {
                const data = [...prevState.data];
                data.push(newData);
                return { ...prevState, data };
              });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setState(prevState => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              setState(prevState => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          })
      }}
    />
  );
}
