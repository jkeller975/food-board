import React from "react";
import "./FoodCard.css";
import Card from "react-bootstrap/Card";
import Produce from "../../defaultImages/produce.png";
import Meat from "../../defaultImages/meat.png";
import Pantry from "../../defaultImages/pantry.png";
import Baby from "../../defaultImages/baby.png";
import Canned from "../../defaultImages/canned.png";
import Misc from "../../defaultImages/misc.png";
import { useAuth } from "../../context/AuthContext";
import { ListGroup } from "react-bootstrap";

const FoodCard = (props) => {
  const defaultImage = (foodType) => {
    switch (foodType) {
      case "produce":
        return Produce;
      case "meat":
        return Meat;
      case "pantry":
        return Pantry;
      case "baby":
        return Baby;
      case "canned":
        return Canned;
      default:
        return Misc;
    }
  };

  const { user } = useAuth();
  return (
    <Card style={{ width: "18em" }}>
      <Card.Header>{props.card.foodType}</Card.Header>
      <Card.Img
        variant="top"
        src={
          props.card.photoUrl
            ? props.card.photoUrl
            : defaultImage(props.card.foodType)
        }
        alt={props.card.title}
      />
      <Card.Body>
        <Card.Title>{props.card.title}</Card.Title>

        <Card.Text>{props.card.details}</Card.Text>
        <ListGroup variant="flush" className="list-group-flush">
          <ListGroup.Item>
            Pickup Location: {props.card.pickupLocation}
          </ListGroup.Item>
          <ListGroup.Item>Posted: {props.card.date}</ListGroup.Item>
          <ListGroup.Item>
            Status: {props.card.claimed ? "Claimed" : "Available"}
          </ListGroup.Item>
        </ListGroup>
        {user && user.uid === props.card.owner ? (
          <Card.Link variant="primary">Mark as claimed</Card.Link>
        ) : null}
      </Card.Body>
    </Card>
  );
};

export default FoodCard;
