import React from "react";
import randomColor from "randomcolor";

import TableView, { Columns, TableColumn } from "../lib/components/table-view";
import data from "./sample-data";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: data || []
    };
  }

  handleInputChange = (e, row) => {
    const updateRows = this.state.data.map(item => {
      if (item === row) {
        return {
          ...item,
          lastName: e.target.value
        };
      }
      return item;
    });

    this.setState({
      data: updateRows
    });
  };

  handleRowClick = (e, row) => {
    alert(row.name);
  };

  render() {
    return (
      <div>
        <TableView
          dataProvider={this.state.data}
          onRowClick={this.handleRowClick}
          renderExpandRow={row => {
            return (
              <tr className="table-view__body-expand-row">
                <td colspan={6}>
                  <div>
                    <p> {row.address}</p>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Ipsam explicabo atque commodi, neque blanditiis, ea
                      similique inventore error tenetur saepe aliquam ad aut
                      vero? Eum maxime veritatis blanditiis tempore animi.
                    </p>
                  </div>
                </td>
              </tr>
            );
          }}
        >
          <Columns>
            <TableColumn
              dataField="picture"
              headerText="Photo"
              headerRenderer={row => <p>Header 2</p>}
              itemRenderer={row => <img src={row.picture} alt="" />}
            />
            <TableColumn
              dataField="name"
              headerText="First Name"
              className="text-left"
            />

            <TableColumn
              dataField="gender"
              headerText="Gender"
              itemRenderer={row => row.gender}
              className="text-left hide-on-mobile"
            />
            <TableColumn
              dataField="age"
              headerText="Age"
              itemRenderer={row => (
                <p style={{ backgroundColor: randomColor() }}>{row.age}</p>
              )}
            />
            <TableColumn
              dataField="email"
              headerText="Email"
              itemRenderer={row => {
                return <a href={"mailto:" + row.email}>{row.email}</a>;
              }}
            />
            <TableColumn
              dataField="phone"
              headerText="Phone"
              className="phone-number"
            />
          </Columns>
          {/* <ExpandRows>
            <TableColumn
                dataField="phone"
                headerText="Phone"
                className="phone-number"
              />
          </ExpandRows> */}
        </TableView>
      </div>
    );
  }
}

export default App;
