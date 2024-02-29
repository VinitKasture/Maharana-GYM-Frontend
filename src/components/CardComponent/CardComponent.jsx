import React from "react";
import "./CardComponent.css";

function CardComponent({ user }) {
  return (
    <div className="custom-card">
      <img
        src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt=""
        srcSet=""
      />
      <div className="profile">
        <strong>
          <h2>
            {user.firstName} {user.lastName}
          </h2>
          <h6>Software Developer</h6>
        </strong>
        <div className="details">
          <div className="box">
            <h5>Articles</h5>
            <strong>68</strong>
          </div>
          <div className="box">
            <h5>Articles</h5>
            <strong>68</strong>
          </div>
          <div className="box">
            <h5>Articles</h5>
            <strong>68</strong>
          </div>
        </div>
        <div className="action">
          <button className="error">Chat</button>
          <button>Follow</button>
        </div>
      </div>
    </div>
  );
}

export default CardComponent;
