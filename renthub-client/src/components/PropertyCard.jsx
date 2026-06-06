function PropertyCard({ title, city, price }) {
    return (
        <div
            style={{
                border: "1px solid #ddd",
                padding: "15px",
                margin: "10px",
                borderRadius: "8px",
            }}
        >
            <h3>{title}</h3>
            <p>{city}</p>
            <p>${price}/month</p>
        </div>
    );
}

export default PropertyCard;