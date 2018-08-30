import React, { Component } from 'react';
import { Timeline, TimelineEvent } from 'react-event-timeline';
import './Timeline.css';
import { Modal, Button } from 'react-bootstrap';
import AuthService from '../../services/AuthService';

import EventService from '../../services/EventService';
const event = new EventService();
const Auth = new AuthService();

class TimeLine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      name: '',
      age: '',
      description: '',
    };

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.addEventVo = this.addEventVo.bind(this);
  }

  open() {
    this.setState({ showModal: true });
  }

  close() {
    this.setState({ showModal: false });
  }

  addEventVo() {
    const eventVo = {
      'usrid': Auth.getProfile().id,
      'name': this.refs.name.value,
      'age': this.refs.age.value,
      'description': this.refs.description.value
    }

    event.addEvent(eventVo)
      .then(data => {
        console.log('xxxxx xxxxx ', data);
      }).catch(err => {
        console.log('xxxxx xxxxx ', err);
      });
  }



  render() {
    return (
      <div>
        <div className="row form-group head_div">
          <div className="pull-left"><span className="head_title">Trauma Timeline</span></div>
          <div className="pull-right event_btn"><button type="button" onClick={this.open} className="btn btn-info">
            <i className="fa fa-plus"> </i> <span>Add Event To Timeline</span>
          </button></div>
        </div>
        <div className="row">
          <div className="col-md-3">
            <div className="panel-group">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h4 className="panel-title">
                    <a >About the Trauma Timeline</a>
                  </h4>
                </div>
                <div className="panel-collapse collapse in">
                  <div className="panel-body panel-body">Panel Body</div>
                </div>
              </div>
            </div>
            <div className="panel-group">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h4 className="panel-title">
                    <a >Frequest Trauma Events</a>
                  </h4>
                </div>
                <div className="panel-collapse collapse in">
                  <p className="panel-body text_cont">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.</p>
                </div>
              </div>
            </div>


          </div>
          <div className="col-md-9">
            <Timeline className="form-group timeline-list">
              <TimelineEvent title="Introduction to Redux in React applications"
                createdAt="2016-09-12 10:06 PM"
                icon={<i className="fas fa-calendar-alt"></i>}
                iconColor="#757575"
                buttons={<span className="icon_font"><i className="fas fa-play-circle"></i></span>}
                container="card"
                style={{ boxShadow: "0 0 6px 1px #BD3B36", border: "1px solid #777", borderRadius: "3" }}
                cardHeaderStyle={{ backgroundColor: "#8bc34a", color: "#503331" }}>
                <p>Card as timeline event with custom container and header styling</p>
                <div className="portlet-content">

                  <button type="button" className="btn btn-yellow"><i className="fas fa-edit"></i> &nbsp; Open Graphic Narative</button>

                  <button type="button" className="btn btn-red"><i className="fas fa-trash-alt"></i> &nbsp; Delete Event</button>

                  <button type="button" className="btn btn-default">Reply</button>

                  <button type="button" className="btn btn-blue">Download pdf</button>
                </div>
              </TimelineEvent>
            </Timeline>
          </div>

        </div>
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Add Event</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="rowcol-md-10" align="center">
              <div className="form-group">
                <input type="text" required="required" className="form-control validate" placeholder="Name of the event" name="name" ref="name" tabIndex="1" />
              </div>
              <div className="form-group">
                <input type="number" required="required" className="form-control validate" placeholder="Age at the time of publish event" name="age" ref="age" tabIndex="2" />
              </div>
              <div className="form-group">
                <textarea className="form-control" name="description" placeholder="Description" ref="description" id="description" tabIndex="3"></textarea>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
            <button type="button" className="btn btn-success" onClick={this.addEventVo}>Create</button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
};
export default TimeLine;