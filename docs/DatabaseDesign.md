# Database Design

## 1. Database Overview

The RentHub Property Rental Management Platform requires a centralized database to store and manage information related to users, rental properties, applications, leases, payments, and maintenance requests.

The database serves as the core data storage component of the system and enables efficient management of rental operations while maintaining data integrity and consistency.

The database design supports the following objectives:

* Store user account information securely
* Manage rental property records
* Track tenant applications
* Maintain lease agreements
* Record rent payment history
* Manage maintenance requests
* Support reporting and analytics

The database is designed to support scalability, maintainability, and future system enhancements.

## 2. Database Technology Selection

### **Selected Database**

MongoDB has been selected as the primary database technology for the RentHub platform.

### **Reasons for Selection**

#### Flexible Schema Design

MongoDB supports a document-based architecture that allows flexible storage of property, lease, payment, and maintenance information.

#### Scalability

MongoDB can efficiently handle increasing volumes of users and property records.

#### Integration with Node.js

MongoDB integrates seamlessly with Node.js applications through the Mongoose Object Data Modeling (ODM) library.

#### JSON-Based Data Storage

MongoDB stores data in BSON format, which closely resembles JSON and aligns naturally with JavaScript-based application development.

#### Development Efficiency

MongoDB reduces development complexity and accelerates implementation due to its flexible document structure.

### **Database Management Tools**

The project will utilize:

* MongoDB Community Edition
* MongoDB Compass
* Mongoose ODM
* MongoDB Atlas (optional cloud deployment)

## 3. Collections

### **Users Collection**

The Users collection stores information for all registered users of the platform.

#### Fields

| Field     | Data Type | Description                    |
| --------- | --------- | ------------------------------ |
| _id       | ObjectId  | Unique identifier              |
| fullName  | String    | User full name                 |
| email     | String    | User email address             |
| password  | String    | Encrypted password             |
| role      | String    | Tenant, Manager, Administrator |
| phone     | String    | Contact number                 |
| createdAt | Date      | Account creation date          |
| updatedAt | Date      | Last modification date         |

### Users Collection

### Properties Collection

### Applications Collection

### Leases Collection

### Payments Collection

### Maintenance Requests Collection

## 4. Collection Relationships

## 5. Schema Definitions

### User Schema

### Property Schema

### Application Schema

### Lease Schema

### Payment Schema

### Maintenance Request Schema

## 6. Data Dictionary

## 7. Entity Relationship Diagram (ERD)

## 8. Database Security Considerations
