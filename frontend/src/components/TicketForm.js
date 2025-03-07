
import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

class TicketForm extends Component {
  state = { title: "", description: "" };

  handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = this.props.token;
      await axios.post(`${API_BASE_URL}/api/tickets`, this.state, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Ticket created successfully!");
      this.setState({ title: "", description: "" });
    } catch (error) {
      console.error("Error creating ticket", error);
    }
  };

  render() {
    return (
      <form className="p-4 border shadow-md my-4" onSubmit={this.handleSubmit}>
        <h2 className="text-lg font-bold mb-2">Create Ticket</h2>
        <input className="border p-2 w-full my-2" type="text" name="title" placeholder="Title" onChange={this.handleChange} />
        <textarea className="border p-2 w-full my-2" name="description" placeholder="Description" onChange={this.handleChange}></textarea>
        <button className="bg-green-500 text-white px-4 py-2 w-full">Submit</button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({ token: state.auth.token });
export default connect(mapStateToProps, {})(TicketForm);
