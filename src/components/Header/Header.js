import React, { Component } from 'react';
import CompanyIcon from 'react-icons/lib/md/filter-hdr';
import ProfileIcon from 'react-icons/lib/md/person-outline';

import './Header.css';

import Search from './Search/Search';

//////////////////////////////////////////////////////// THIS COMPONENT IS BEING RENDERED IN THE *APP* COMPONENT

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      headerText: ""
    }
    this.changeHeaderText = this.changeHeaderText.bind(this)
  }

  changeHeaderText(text) {
    this.setState({headerText: text})
    this.props.setSearchText(this.state.headerText)
  }


  render() {
    return (
      <section className="Header__parent">
        <section className="Header__content">

          {/* Displays the mountain icon in the header */}
          <div className="Header__company-info">
            <CompanyIcon id="Header__company-icon" />
            <span>Social Mountain</span>
          </div>

          {/* Displays the search bar */}
          <div className="Header__right">
            <Search changeHeaderState={this.changeHeaderText}/>

            {/* Displays the profile icon */}
            <div className="Header__profile">
              <ProfileIcon />
            </div>
          </div>

        </section>
      </section>
    )
  }
}