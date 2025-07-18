import React from "react";
import Card from "../../../Shared/Components/UIElements/Card";
import "./PlaceList.css";
import PlaceItem from "./PlaceItem";
import Button from '../../../Shared/Components/FormElements/Button';
const PlaceList = (props) => {
    if (props.items.length === 0) {
        return (
            <div className="place-list center">
                <Card>
                    <h2>No places found. Maybe create one?</h2>
                    <Button to="/places/new">Share place</Button>
                </Card>
            </div>
        );
}

    return (
        <ul className="place-list">
            {props.items.map((place) => (
                <PlaceItem
                    key={place.id}
                    id={place.id}
                    image={place.imageUrl}
                    title={place.title}
                    description={place.description}
                    address={place.address}
                    creatorId={place.creator}
                    coordinates={place.location} // ✅ Fixed
                />
            ))}
        </ul>
    );
};

export default PlaceList;
