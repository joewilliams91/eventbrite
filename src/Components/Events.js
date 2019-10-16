import React, { Component } from "react";
import * as api from "./api";
import Event from "./Event";
import { DateRange } from "react-date-range";

export default class Events extends Component {
  state = {
    events: [],
    pagination: {},
    location: {},
    startDate: "",
    endDate: "",
    params: {}
  };

  handleSelect = range => {
    this.setState({ endDate: range.endDate._d, startDate: range.startDate._d });
  };

  searchEvents = () => {
    const { startDate, endDate } = this.state;

    const startDateDay = startDate.getDate();
    const startDateMonth = startDate.getMonth() + 1;
    const startDateYear = startDate.getFullYear();
    const endDateDay = endDate.getDate();
    const endDateMonth = endDate.getMonth() + 1;
    const endDateYear = endDate.getFullYear();

    const start_date =
      [
        startDateYear.toString(),
        startDateMonth.toString(),
        startDateDay.toString()
      ].join("-") + "T00%3A00%3A00";
    const end_date =
      [
        endDateYear.toString(),
        endDateMonth.toString(),
        endDateDay.toString()
      ].join("-") + "T23%3A59%3A59";

    const params = {
      start_date,
      end_date,
      page: 1
    };

    this.setState({ params });
  };

  nextPage = () => {
    this.setState(currentState => {
      const newPage = currentState.params.page + 1;
      const newParams = { ...currentState.params, page: newPage };
      return { ...currentState, params: newParams };
    });
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (
      (prevState.params.start_date !== this.state.params.start_date &&
        prevState.params.end_date !== this.state.params.end_date) ||
      prevState.params.page !== this.state.params.page
    ) {
      const { params } = this.state;
      api.getEvents(params).then(({ events, pagination, location }) => {
        this.setState({ events, pagination, location }, () => {
          window.scrollTo(0, 0);
        });
      });
    }
  };

  render() {
    const { events, pagination } = this.state;
    return (
      <div>
        <div className="title-container">
          <h1 className="page-title">Events in Manchester</h1>
          </div>
          <div className="date-range-container">
          <h2>Please select a date range:</h2>
        </div>
        <div className="calendar">
          <DateRange
            onInit={this.handleSelect}
            onChange={this.handleSelect}
            format="YYYY/MM/DD"
          />
        </div>
        <div className="button-container">
          <button className="button" onClick={this.searchEvents}>
            Search
          </button>
        </div>
        <div className="events-container">
          {events &&
            events.map(event => {
              return <Event key={event.id} event={event} />;
            })}
        </div>
        {events && pagination.has_more_items && (
          <div className="button-container">
            <button className="button" onClick={this.nextPage}>
              Next page
            </button>
          </div>
        )}
      </div>
    );
  }
}
