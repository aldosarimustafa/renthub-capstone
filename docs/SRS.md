# Software Requirements Specification (SRS)

## 1. Introduction

### 1.1 Purpose

The purpose of this Software Requirements Specification (SRS) is to define the functional and non-functional requirements of the RentHub Property Rental Management Platform. This document serves as a reference for developers, project stakeholders, testers, and future maintainers throughout the software development life cycle.

The system is designed to simplify rental property management by providing a centralized platform for tenants, property managers, and administrators.

### 1.2 Scope

RentHub is a web-based property rental management platform that enables users to manage rental properties, tenant applications, lease agreements, rent payments, maintenance requests, and reporting activities.

The platform aims to improve efficiency, reduce administrative workload, and provide better communication between tenants and property managers.

### 1.3 Definitions and Acronyms

| Term             | Definition                                        |
| ---------------- | ------------------------------------------------- |
| Tenant           | User renting a property                           |
| Property Manager | User responsible for managing rental properties   |
| Administrator    | User responsible for managing the system          |
| Lease            | Legal agreement between tenant and property owner |
| JWT              | JSON Web Token used for authentication            |
| API              | Application Programming Interface                 |
| CRUD             | Create, Read, Update, Delete                      |
| SRS              | Software Requirements Specification               |

### 1.4 References

* IEEE 830 Software Requirements Specification Guidelines
* React.js Documentation
* Node.js Documentation
* Express.js Documentation
* MongoDB Documentation
* GitHub Documentation

---

## 2. System Overview

### 2.1 Product Perspective**

RentHub is a web-based property rental management platform designed to support tenants, property managers, and administrators. The system will operate as a full-stack web application consisting of a React frontend, a Node.js/Express backend, and a MongoDB database.

The platform provides a centralized environment where users can manage rental properties, applications, leases, payments, and maintenance requests through a single system.

---

### 2.2 Product Functions**

The RentHub platform will provide the following core functions:

* User registration and authentication
* Role-based access control
* Property listing management
* Property search and viewing
* Rental application submission
* Application review and approval
* Lease management
* Rent payment tracking
* Maintenance request management
* Reporting and analytics

These functions are intended to improve operational efficiency and streamline communication between tenants and property managers.

---

### 2.3 User Classes**

The system supports three primary user groups:

#### Tenant**

Tenants can:

* Browse available properties
* Submit rental applications
* View lease information
* Track payment history
* Submit maintenance requests

#### Property Manager**

Property managers can:

* Create and manage property listings
* Review tenant applications
* Manage lease agreements
* Record rent payments
* Update maintenance requests
* Generate reports

#### Administrator**

Administrators can:

* Manage user accounts
* Monitor platform activity
* Control system permissions
* Maintain system integrity

---

### 2.4 Operating Environment**

RentHub will operate as a web-based application accessible through modern internet browsers such as Google Chrome, Microsoft Edge, Mozilla Firefox, and Safari.

The development environment consists of:

* React.js for frontend development
* Node.js and Express.js for backend development
* MongoDB for database management
* Git and GitHub for version control
* Visual Studio Code as the primary development environment

---

### 2.5 Assumptions and Dependencies**

The development and operation of the system rely on the following assumptions:

* Users have access to a stable internet connection.
* Users possess basic computer literacy.
* MongoDB services are available and operational.
* Node.js runtime is installed on the deployment server.
* Modern web browsers are used to access the system.

The project depends on third-party technologies including React, Express, MongoDB, GitHub, and related development libraries.


---

## 3. Functional Requirements

### FR-1 User Registration

### FR-2 User Authentication

### FR-3 Property Management

### FR-4 Rental Applications

### FR-5 Lease Management

### FR-6 Payment Management

### FR-7 Maintenance Requests

### FR-8 Reporting Dashboard

---

## 4. Non-Functional Requirements

### NFR-1 Performance

### NFR-2 Security

### NFR-3 Reliability

### NFR-4 Usability

### NFR-5 Scalability

### NFR-6 Maintainability

---

## 5. User Roles

### Tenant

### Property Manager

### Administrator

---

## 6. Use Cases

### UC-1 Register Account

### UC-2 Login

### UC-3 Browse Properties

### UC-4 Submit Application

### UC-5 Create Lease

### UC-6 Record Payment

### UC-7 Submit Maintenance Request

---

## 7. User Stories

---

## 8. Acceptance Criteria

---

## 9. System Requirements

### Hardware Requirements

### Software Requirements
