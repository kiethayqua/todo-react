import React, { Component } from "react";
import Search from "./Search";
import Sort from "./Sort";

export default class Control extends Component {
  render() {
    return (
      <div className="row mt-15">
        {/* Search */}
        <Search />

        {/* Sort */}
        <Sort
          sortNameAZ={this.props.sortNameAZ}
          sortNameZA={this.props.sortNameZA}
          sortStatusTrue={this.props.sortStatusTrue}
          sortStatusFalse={this.props.sortStatusFalse}
        />
      </div>
    );
  }
}
