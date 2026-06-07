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

### **5.1 User Schema**

The User schema stores information about all registered users in the platform.

#### Fields

| Field     | Type   | Required |
| --------- | ------ | -------- |
| fullName  | String | Yes      |
| email     | String | Yes      |
| password  | String | Yes      |
| role      | String | Yes      |
| phone     | String | No       |
| createdAt | Date   | Yes      |
| updatedAt | Date   | Yes      |

#### Role Values

* Tenant
* Property Manager
* Administrator

---

### **5.2 Property Schema**

The Property schema stores rental property information.

#### Fields

| Field       | Type     | Required |
| ----------- | -------- | -------- |
| title       | String   | Yes      |
| description | String   | Yes      |
| address     | String   | Yes      |
| city        | String   | Yes      |
| state       | String   | Yes      |
| zipCode     | String   | Yes      |
| rentAmount  | Number   | Yes      |
| bedrooms    | Number   | Yes      |
| bathrooms   | Number   | Yes      |
| status      | String   | Yes      |
| managerId   | ObjectId | Yes      |
| createdAt   | Date     | Yes      |
| updatedAt   | Date     | Yes      |

#### Status Values

* Available
* Occupied
* Maintenance

### **5.3 Application Schema**

The Application schema stores rental applications submitted by tenants.

#### Fields

| Field           | Type     | Required |
| --------------- | -------- | -------- |
| tenantId        | ObjectId | Yes      |
| propertyId      | ObjectId | Yes      |
| applicationDate | Date     | Yes      |
| status          | String   | Yes      |
| notes           | String   | No       |
| createdAt       | Date     | Yes      |

#### Status Values

* Pending
* Approved
* Rejected

---

### **5.4 Lease Schema**

The Lease schema stores lease agreement information.

#### Fields

| Field       | Type     | Required |
| ----------- | -------- | -------- |
| tenantId    | ObjectId | Yes      |
| propertyId  | ObjectId | Yes      |
| startDate   | Date     | Yes      |
| endDate     | Date     | Yes      |
| monthlyRent | Number   | Yes      |
| leaseStatus | String   | Yes      |
| createdAt   | Date     | Yes      |

#### Lease Status Values

* Active
* Expired
* Terminated

---

### **5.5 Payment Schema**

The Payment schema stores rent payment records.

#### Fields

| Field         | Type     | Required |
| ------------- | -------- | -------- |
| tenantId      | ObjectId | Yes      |
| leaseId       | ObjectId | Yes      |
| amount        | Number   | Yes      |
| paymentDate   | Date     | Yes      |
| paymentMethod | String   | Yes      |
| paymentStatus | String   | Yes      |
| createdAt     | Date     | Yes      |

#### Payment Status Values

* Paid
* Pending
* Late

---

### **5.6 Maintenance Request Schema**

The Maintenance Request schema stores maintenance issues submitted by tenants.

#### Fields

| Field       | Type     | Required |
| ----------- | -------- | -------- |
| tenantId    | ObjectId | Yes      |
| propertyId  | ObjectId | Yes      |
| title       | String   | Yes      |
| description | String   | Yes      |
| status      | String   | Yes      |
| priority    | String   | Yes      |
| submittedAt | Date     | Yes      |
| completedAt | Date     | No       |

#### Status Values

* Open
* In Progress
* Completed

#### Priority Values

* Low
* Medium
* High


## 6. Data Dictionary

### **Users Collection**

| Field    | Description                         |
| -------- | ----------------------------------- |
| fullName | Full legal name of the user         |
| email    | Unique email address used for login |
| password | Encrypted password                  |
| role     | User role within the system         |
| phone    | User contact number                 |

---

### **Properties Collection**

| Field       | Description                   |
| ----------- | ----------------------------- |
| title       | Property listing title        |
| description | Detailed property description |
| address     | Property street address       |
| city        | Property city                 |
| state       | Property state                |
| zipCode     | Postal code                   |
| rentAmount  | Monthly rental amount         |
| bedrooms    | Number of bedrooms            |
| bathrooms   | Number of bathrooms           |
| status      | Current property status       |

---

### **Applications Collection**

| Field           | Description                 |
| --------------- | --------------------------- |
| tenantId        | Applicant reference         |
| propertyId      | Property reference          |
| applicationDate | Submission date             |
| status          | Application decision status |
| notes           | Manager comments            |

---

### **Leases Collection**

| Field       | Description           |
| ----------- | --------------------- |
| tenantId    | Tenant reference      |
| propertyId  | Property reference    |
| startDate   | Lease start date      |
| endDate     | Lease end date        |
| monthlyRent | Monthly rental amount |
| leaseStatus | Current lease status  |

---

### **Payments Collection**

| Field         | Description            |
| ------------- | ---------------------- |
| tenantId      | Tenant reference       |
| leaseId       | Lease reference        |
| amount        | Payment amount         |
| paymentDate   | Date of payment        |
| paymentMethod | Method of payment      |
| paymentStatus | Current payment status |

---

### **Maintenance Requests Collection**

| Field       | Description                |
| ----------- | -------------------------- |
| tenantId    | Tenant reference           |
| propertyId  | Property reference         |
| title       | Maintenance request title  |
| description | Detailed issue description |
| status      | Current request status     |
| priority    | Request priority level     |

## 7. Entity Relationship Diagram (ERD)

### Entity Relationships

User (Tenant)
│
├── Applications
├── Leases
├── Payments
└── Maintenance Requests

User (Property Manager)
│
└── Properties

Property
│
├── Applications
├── Leases
└── Maintenance Requests

Lease
│
└── Payments

### Relationship Summary

* One Property Manager manages many Properties.
* One Tenant can submit many Applications.
* One Property can receive many Applications.
* One Tenant can have many Leases.
* One Property can have many Leases.
* One Lease can contain many Payments.
* One Tenant can make many Payments.
* One Tenant can create many Maintenance Requests.
* One Property can have many Maintenance Requests.

## 8. Database Security Considerations

The RentHub database shall implement security measures to protect user information and maintain data integrity.

### Authentication Security

* Passwords shall be encrypted using bcrypt.
* JWT tokens shall be used for user authentication.
* User sessions shall be validated before accessing protected resources.

### Authorization Security

* Role-based access control shall restrict access to system functionality.
* Users may access only resources permitted by their assigned role.

### Data Protection

* Sensitive user information shall not be stored in plain text.
* Input validation shall be performed before database operations.
* Database queries shall be protected against malicious input.

### Backup and Recovery

* Regular backups should be performed.
* Recovery procedures should be documented.
* Data loss risks should be minimized through backup strategies.

### Future Security Enhancements

Potential future enhancements include:

* Multi-factor authentication
* Audit logging
* Data encryption at rest
* Advanced access monitoring
