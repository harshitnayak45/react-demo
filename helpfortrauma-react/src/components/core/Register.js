import React, { Component } from 'react';
import AuthService from '../../services/AuthService';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
} from 'react-router-dom';
import $ from 'jquery';
import axios from 'axios';
const Auth = new AuthService();

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: '',
      fName: '',
      lName: '',
      email: '',
      cell: '',
      role: '',
      address: '',
      address2: '',
      city: '',
      state: '',
      zip: '',
      username: '',
      pass: '',
      message: '',
      agree: '',
      fields: {},
      errors: {},
      isChecked: false

    };

    this.RegisterMe = this.RegisterMe.bind(this);
    this.handleCheck = this.handleCheck.bind(this);

  }

  handleCheck(event) {
    this.setState({ isChecked: event.target.checked });
  }

  handleValidation() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;
    //Email
    if (!fields["email"]) {
      formIsValid = false;
      errors["email"] = "Cannot be empty";
    }
    if (typeof fields["email"] !== "undefined") {
      let lastAtPos = fields["email"].lastIndexOf('@');
      let lastDotPos = fields["email"].lastIndexOf('.');
      if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') == -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
        formIsValid = false;
        errors["email"] = "Email is not valid";
      }
    }
    if (!fields["fName"]) {
      formIsValid = false;
      errors["fName"] = "Cannot be empty firstname";
    }
    if (!fields["lName"]) {
      formIsValid = false;
      errors["lName"] = "Cannot be empty lastname";
    }
    if (!fields["cell"]) {
      formIsValid = false;
      errors["cell"] = "Cannot be empty mobile";
    }
    if (!fields["username"]) {
      formIsValid = false;
      errors["username"] = "Cannot be empty username";
    }
    if (!fields["pass"]) {
      formIsValid = false;
      errors["pass"] = "Cannot be empty password";
    }
    this.setState({ errors: errors });
    return formIsValid;
  }
  componentDidMount() {
    var navListItems = $('div.setup-panel div a'),
      allWells = $('.setup-content'),
      allNextBtn = $('.nextBtn'),
      allPrevBtn = $('.prevBtn');
    allWells.show();
    navListItems.click(function (e) {
      e.preventDefault();
      var $target = $($(this).attr('href')),
        $item = $(this);
      if (!$item.hasClass('disabled')) {
        navListItems.removeClass('btn-indigo').addClass('btn-default');
        $item.addClass('btn-indigo');
        allWells.hide();
        $target.show();
        $target.find('input:eq(0)').focus();
      }

    });
    allPrevBtn.click(function () {
      var curStep = $(this).closest(".setup-content"),
        curStepBtn = curStep.attr("id"),
        prevStepSteps = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().prev().children("a");
      prevStepSteps.removeAttr('disabled').trigger('click');
    });
    allNextBtn.click(function () {
      var curStep = $(this).closest(".setup-content"),
        curStepBtn = curStep.attr("id"),
        nextStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().next().children("a"),
        curInputs = curStep.find("input[type='text'],input[type='url']"),
        isValid = true;
      $(".form-group").removeClass("has-error");
      for (var i = 0; i < curInputs.length; i++) {
        if (!curInputs[i].validity.valid) {
          isValid = false;
          $(curInputs[i]).closest(".form-group").addClass("has-error");
        }
      }
      if (isValid)
        nextStepWizard.removeAttr('disabled').trigger('click');
    });
    $('div.setup-panel div a.btn-indigo').trigger('click');
  }
  RegisterMe(e) {
    e.preventDefault();
    if (this.handleValidation()) {
      this.setState({ message: 'Form submitted' });
      this.props.history.push("/login")
    } else {
      this.setState({ message: 'Form has errors' });
    }
    const userInfoVo = {
      'fName': this.refs.fName.value,
      'lName': this.refs.lName.value,
      'email': this.refs.email.value,
      'cell': this.refs.cell.value,
      'role': this.refs.role.value,
      'address': this.refs.address.value,
      'address2': this.refs.address2.value,
      'city': this.refs.city.value,
      'state': this.refs.state.value,
      'zip': this.refs.zip.value,
      'created': '',
      'username': this.refs.username.value,
      'pass': this.refs.pass.value
    }
    axios.post(Auth.getDomain() + '/register/user', userInfoVo)
      .then((result) => {
        this.props.history.replace('/login');
      }).catch(err => {
        alert(err);
      });
    //console.log(userInfoVo);
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <h1>Register</h1>
        <hr className="account-header-divider" />
        <div className="account-wrapper">
          <div className="account-logo">
            <img src="./img/logo-login.png" alt="Target Admin" />
          </div>
          <div className="account-body">
            <h3 className="account-body-title">Get Started with a Free Account.</h3>
            <h5 className="account-body-subtitle">Sign up in 30 seconds. No credit card required.</h5>
            <div className="steps-form">
              <div className="steps-row setup-panel">
                <div className="steps-step">
                  <a href="#step-9" type="button" className="btn btn-indigo btn-circle">1</a>
                  <p>Step 1</p>
                </div>
                <div className="steps-step">
                  <a href="#step-10" type="button" className="btn btn-default btn-circle" disabled="disabled">2</a>
                  <p>Step 2</p>
                </div>
                <div className="steps-step">
                  <a href="#step-11" type="button" className="btn btn-default btn-circle" disabled="disabled">3</a>
                  <p>Step 3</p>
                </div>
              </div>
            </div>
            <form className="form account-form" action="#">
              <div className="row setup-content" id="step-9">
                <div className="col-md-12 formClass">
                  <div className="form-group">
                    <label htmlFor="fName" className="placeholder-hidden">Your Firstname</label>
                    <input type="text" required="required" className="form-control validate" ref="fName" placeholder="Your FirstName" name="fName" value={this.state.fields["fName"]} tabIndex="1" />
                    <span style={{ color: "red" }}>{this.state.errors["fName"]}</span>
                  </div>
                  <div className="form-group">
                    <label htmlFor="lName" className="placeholder-hidden">Your Lastname</label>
                    <input type="text" required="required" className="form-control validate" id="lName" ref="lName" placeholder="Your LastName" name="lName" value={this.state.fields["lName"]} tabIndex="2" />
                    <span style={{ color: "red" }}>{this.state.errors["lName"]}</span>
                  </div>
                  <div className="form-group">
                    <label htmlFor="email" className="placeholder-hidden">Email Address</label>
                    <input type="text" required="required" className="form-control validate" id="email" placeholder="Your Email" ref="email" name="email" value={this.state.fields["email"]} tabIndex="3" />
                    <span style={{ color: "red" }}>{this.state.errors["email"]}</span>
                  </div>
                  <div className="form-group">
                    <label htmlFor="cell" className="placeholder-hidden">Your PhoneNumber</label>
                    <input type="text" required="required" className="form-control validate" id="cell" ref="cell" placeholder="Your PhoneNumber" name="cell" value={this.state.fields["cell"]} tabIndex="4" />
                    <span style={{ color: "red" }}>{this.state.errors["cell"]}</span>
                  </div>
                  <div className="form-group">
                    <label htmlFor="Profession" className="placeholder-hidden">Select Role</label>
                    <select required="true" className="form-control validate" id="profession" ref="role" tabIndex="5">
                      <option value="stand">Standard</option>
                      <option value="prof">Professional</option>
                      <option value="org">Organization</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="Address" className="placeholder-hidden">Address</label>
                    <input type="text" required="required" className="form-control validate" id="address" ref="address" placeholder="Address 1" tabIndex="6" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="Address2" className="placeholder-hidden">Address 2</label>
                    <input type="text" className="form-control" id="address2" ref="address2" placeholder="Address 2" tabIndex="7" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="City" className="placeholder-hidden">City</label>
                    <input type="text" required="required" className="form-control validate" id="city" ref="city" placeholder="City" tabIndex="8" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="State" className="placeholder-hidden">State</label>
                    <input type="text" required="required" className="form-control validate" id="state" ref="state" placeholder="State" tabIndex="9" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="Zip" className="placeholder-hidden">Zip</label>
                    <input type="text" required="required" className="form-control validate" id="zip" ref="zip" placeholder="Zip" tabIndex="10" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="username" className="placeholder-hidden">Username</label>
                    <input type="text" required="required" className="form-control validate" id="username" ref="username" placeholder="Username" tabIndex="11" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="pass" className="placeholder-hidden">Password</label>
                    <input type="password" required="required" className="form-control validate" id="pass" ref="pass" placeholder="Password" tabIndex="12" />
                  </div>
                  <div className="form-group">
                    <label className="checkbox-inline">
                      <input type="checkbox" onChange={(event) => this.handleCheck(event)} className="" id="check" ref="agree" tabIndex="5" /> I agree to the <a href="#" target="_blank">Terms of Service</a> &amp; <a href="javascript:;" target="_blank">Privacy Policy</a>
                    </label>
                  </div>
                  <button className="btn btn-indigo btn-rounded nextBtn float-right" type="button" disabled={!this.state.isChecked}>Next</button>
                </div>
              </div>
              <div className="row setup-content" id="step-10">
                <div className="col-md-12">
                  <div className="card-deck mb-3 text-center form-group">
                    <div className="card mb-4 shadow-sm">
                      <div className="card-header">
                        <h4 className="my-0 font-weight-normal">Free</h4>
                      </div>
                      <div className="card-body">
                        <h1 className="card-title pricing-card-title">$0 <small className="text-muted">/ mo</small></h1>
                        <ul className="list-unstyled mt-3 mb-4">
                          <li>10 users included</li>
                          <li>2 GB of storage</li>
                          <li>Email support</li>
                          <li>Help center access</li>
                        </ul>
                        <button type="button" className="btn btn-lg btn-block btn-outline-primary">Sign up for free</button>
                      </div>
                    </div>
                    <div className="card mb-4 shadow-sm">
                      <div className="card-header">
                        <h4 className="my-0 font-weight-normal">Pro</h4>
                      </div>
                      <div className="card-body">
                        <h1 className="card-title pricing-card-title">$15 <small className="text-muted">/ mo</small></h1>
                        <ul className="list-unstyled mt-3 mb-4">
                          <li>20 users included</li>
                          <li>10 GB of storage</li>
                          <li>Priority email support</li>
                          <li>Help center access</li>
                        </ul>
                        <button type="button" className="btn btn-lg btn-block btn-primary nextBtn">Get started</button>
                      </div>
                    </div>
                    <div className="card mb-4 shadow-sm">
                      <div className="card-header">
                        <h4 className="my-0 font-weight-normal">Enterprise</h4>
                      </div>
                      <div className="card-body">
                        <h1 className="card-title pricing-card-title">$29 <small className="text-muted">/ mo</small></h1>
                        <ul className="list-unstyled mt-3 mb-4">
                          <li>30 users included</li>
                          <li>15 GB of storage</li>
                          <li>Phone and email support</li>
                          <li>Help center access</li>
                        </ul>
                        <button type="button" className="btn btn-lg btn-block btn-primary nextBtn">Contact us</button>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                  </div>
                </div>
              </div>
              <div className="row setup-content" id="step-11" align="center" >
                <h4>Please!..Click the button to Register Account</h4>
                <button type="button" onClick={this.RegisterMe} className="btn btn-secondary btn-inline btn-lg" tabIndex="6">
                  Create My Account &nbsp; <i className="fa fa-play-circle"></i>
                </button>
              </div>
            </form>
          </div>
          <div className="account-footer">
            <p>
              Already have an account? &nbsp;
    <Link to={'/login'}> <i className="fa fa-unlock"></i> Login to your Account!</Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
}
export default Register;