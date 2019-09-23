import React, { Component } from "react";
import "./Table.css";

class Table extends Component {
  constructor(props) {
    super(props); //since we are extending class Table so we have to use super in order to override Component class constructor
    this.state = {
      students: props.catalogList
    };
  }

  renderTableData() {
    return this.state.students.map((student, index) => {
      const { id, Category, SubCategory, Item, Language, fsId } = student; //destructuring
      return (
        <tr key={id}>
          <td>{id}</td>
          <td>{Category}</td>
          <td>{SubCategory}</td>
          <td>{Item}</td>
          <td>{Language}</td>
          <td>{fsId}</td>
        </tr>
      );
    });
  }

  renderTableHeader() {
    let header = Object.keys(this.state.students[0]);
    return header.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    });
  }

  render() {
    return (
      <div>
        <h1 id="title">Listado Catalogo</h1>
        <table id="students">
          <tbody>
            <tr>{this.renderTableHeader()}</tr>
            {this.renderTableData()}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Table;
