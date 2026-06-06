import PropertyCard from "../components/PropertyCard";

function Properties() {
    const properties = [
        {
            id: 1,
            title: "Downtown Apartment",
            city: "Orlando",
            price: 1400,
        },
        {
            id: 2,
            title: "Lake View Condo",
            city: "Tampa",
            price: 1800,
        },
        {
            id: 3,
            title: "Family House",
            city: "Miami",
            price: 2500,
        },
    ];

    return (
        <div>
            <h1>Available Properties</h1>

            {properties.map((property) => (
                <PropertyCard
                    key={property.id}
                    title={property.title}
                    city={property.city}
                    price={property.price}
                />
            ))}
        </div>
    );
}

export default Properties;