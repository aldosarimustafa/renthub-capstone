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

### **Properties Collection**

The Properties collection stores information about rental properties managed through the platform.

#### Fields

| Field       | Data Type | Description                      |
| ----------- | --------- | -------------------------------- |
| _id         | ObjectId  | Unique identifier                |
| title       | String    | Property title                   |
| description | String    | Property description             |
| address     | String    | Property address                 |
| city        | String    | Property city                    |
| state       | String    | Property state                   |
| zipCode     | String    | Postal code                      |
| rentAmount  | Number    | Monthly rental amount            |
| bedrooms    | Number    | Number of bedrooms               |
| bathrooms   | Number    | Number of bathrooms              |
| status      | String    | Available, Occupied, Maintenance |
| managerId   | ObjectId  | Property manager reference       |
| createdAt   | Date      | Creation date                    |
| updatedAt   | Date      | Last update date                 |

---

### **Applications Collection**

The Applications collection stores tenant rental applications.

#### Fields

| Field           | Data Type | Description                 |
| --------------- | --------- | --------------------------- |
| _id             | ObjectId  | Unique identifier           |
| tenantId        | ObjectId  | Tenant reference            |
| propertyId      | ObjectId  | Property reference          |
| applicationDate | Date      | Submission date             |
| status          | String    | Pending, Approved, Rejected |
| notes           | String    | Manager notes               |
| createdAt       | Date      | Creation date               |

---

### **Leases Collection**

The Leases collection stores lease agreement information.

#### Fields

| Field       | Data Type | Description                 |
| ----------- | --------- | --------------------------- |
| _id         | ObjectId  | Unique identifier           |
| tenantId    | ObjectId  | Tenant reference            |
| propertyId  | ObjectId  | Property reference          |
| startDate   | Date      | Lease start date            |
| endDate     | Date      | Lease end date              |
| monthlyRent | Number    | Monthly rent amount         |
| leaseStatus | String    | Active, Expired, Terminated |
| createdAt   | Date      | Creation date               |

---

### **Payments Collection**

The Payments collection stores rent payment records.

#### Fields

| Field         | Data Type | Description          |
| ------------- | --------- | -------------------- |
| _id           | ObjectId  | Unique identifier    |
| tenantId      | ObjectId  | Tenant reference     |
| leaseId       | ObjectId  | Lease reference      |
| amount        | Number    | Payment amount       |
| paymentDate   | Date      | Payment date         |
| paymentMethod | String    | Cash, Card, Transfer |
| paymentStatus | String    | Paid, Pending, Late  |
| createdAt     | Date      | Creation date        |

---

### **Maintenance Requests Collection**

The Maintenance Requests collection stores maintenance and repair requests submitted by tenants.

#### Fields

| Field       | Data Type | Description                  |
| ----------- | --------- | ---------------------------- |
| _id         | ObjectId  | Unique identifier            |
| tenantId    | ObjectId  | Tenant reference             |
| propertyId  | ObjectId  | Property reference           |
| title       | String    | Request title                |
| description | String    | Issue description            |
| status      | String    | Open, In Progress, Completed |
| priority    | String    | Low, Medium, High            |
| submittedAt | Date      | Submission date              |
| completedAt | Date      | Completion date              |


## 4. Collection Relationships

The RentHub database consists of multiple collections that are related through reference fields using MongoDB ObjectIds.

### **User ↔ Property Relationship**

A property manager can manage multiple properties.

Relationship Type:

**One-to-Many**

* One manager → Many properties
* Each property → One manager

Reference:

```text
Property.managerId → User._id
```

---

### **User ↔ Application Relationship**

A tenant can submit multiple rental applications.

Relationship Type:

**One-to-Many**

* One tenant → Many applications
* Each application → One tenant

Reference:

```text
Application.tenantId → User._id
```

---

### **Property ↔ Application Relationship**

A property may receive multiple rental applications.

Relationship Type:

**One-to-Many**

* One property → Many applications
* Each application → One property

Reference:

```text
Application.propertyId → Property._id
```

---

### **Tenant ↔ Lease Relationship**

A tenant may have multiple lease records over time.

Relationship Type:

**One-to-Many**

* One tenant → Many leases
* Each lease → One tenant

Reference:

```text
Lease.tenantId → User._id
```

---

### **Property ↔ Lease Relationship**

Each lease belongs to a specific property.

Relationship Type:

**One-to-Many**

* One property → Many leases
* Each lease → One property

Reference:

```text
Lease.propertyId → Property._id
```

---

### **Lease ↔ Payment Relationship**

A lease can contain multiple payment records.

Relationship Type:

**One-to-Many**

* One lease → Many payments
* Each payment → One lease

Reference:

```text
Payment.leaseId → Lease._id
```

---

### **Tenant ↔ Payment Relationship**

A tenant can make multiple rent payments.

Relationship Type:

**One-to-Many**

* One tenant → Many payments
* Each payment → One tenant

Reference:

```text
Payment.tenantId → User._id
```

---

### **Tenant ↔ Maintenance Request Relationship**

A tenant may submit multiple maintenance requests.

Relationship Type:

**One-to-Many**

* One tenant → Many requests
* Each request → One tenant

Reference:

```text
MaintenanceRequest.tenantId → User._id
```

---

### **Property ↔ Maintenance Request Relationship**

A property may have multiple maintenance requests.

Relationship Type:

**One-to-Many**

* One property → Many maintenance requests
* Each request → One property

Reference:

```text
MaintenanceRequest.propertyId → Property._id
```

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
