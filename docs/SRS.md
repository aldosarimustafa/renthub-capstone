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

### 2.1 Product Perspective

RentHub is a web-based property rental management platform designed to support tenants, property managers, and administrators. The system will operate as a full-stack web application consisting of a React frontend, a Node.js/Express backend, and a MongoDB database.

The platform provides a centralized environment where users can manage rental properties, applications, leases, payments, and maintenance requests through a single system.

---

### 2.2 Product Functions

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

### 2.3 User Classes

The system supports three primary user groups:

#### Tenant

Tenants can:

* Browse available properties
* Submit rental applications
* View lease information
* Track payment history
* Submit maintenance requests

#### Property Manager

Property managers can:

* Create and manage property listings
* Review tenant applications
* Manage lease agreements
* Record rent payments
* Update maintenance requests
* Generate reports

#### Administrator

Administrators can:

* Manage user accounts
* Monitor platform activity
* Control system permissions
* Maintain system integrity

---

### 2.4 Operating Environment

RentHub will operate as a web-based application accessible through modern internet browsers such as Google Chrome, Microsoft Edge, Mozilla Firefox, and Safari.

The development environment consists of:

* React.js for frontend development
* Node.js and Express.js for backend development
* MongoDB for database management
* Git and GitHub for version control
* Visual Studio Code as the primary development environment

---

### 2.5 Assumptions and Dependencies

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

The system shall allow new users to create an account by providing:

* Full name
* Email address
* Password
* User role

The system shall validate user input and prevent duplicate email registrations.

---

### FR-2 User Authentication

The system shall allow registered users to log into the platform using their email address and password.

The system shall:

* Verify user credentials
* Generate authentication tokens
* Maintain secure user sessions
* Allow users to log out

---

### FR-3 Property Management

The system shall allow property managers to:

* Create property listings
* Edit property information
* Delete property listings
* View all managed properties

Property information shall include:

* Property title
* Description
* Address
* Rental price
* Property images
* Availability status

---

### FR-4 Rental Applications

The system shall allow tenants to submit rental applications for available properties.

The system shall allow property managers to:

* Review applications
* Approve applications
* Reject applications
* View application history

---

### FR-5 Lease Management

The system shall allow property managers to:

* Create lease agreements
* Update lease information
* View active leases
* View expired leases

Tenants shall be able to view their lease details.

---

### FR-6 Payment Management

The system shall allow:

* Recording rent payments
* Viewing payment history
* Tracking payment status
* Generating payment records

Property managers shall be able to monitor tenant payment activity.

---

### FR-7 Maintenance Requests

The system shall allow tenants to:

* Submit maintenance requests
* Describe maintenance issues
* Track maintenance status

Property managers shall be able to:

* Review requests
* Update request status
* Mark requests as completed

---

### FR-8 Reporting Dashboard

The system shall provide reporting functionality including:

* Occupancy reports
* Payment reports
* Property reports
* Maintenance reports

Reports shall assist property managers in monitoring operational performance.


---

## 4. Non-Functional Requirements

### NFR-1 Performance

The system shall respond to user requests within 3 seconds under normal operating conditions.

The system shall support at least 100 concurrent users without significant degradation in performance.

---

### NFR-2 Security

The system shall provide secure user authentication using JSON Web Tokens (JWT).

Passwords shall be encrypted before storage using industry-standard hashing algorithms.

The system shall restrict access to resources based on user roles and permissions.

---

### NFR-3 Reliability

The system shall maintain data integrity during normal operation.

The system shall recover gracefully from application errors and provide meaningful error messages to users.

---

### NFR-4 Usability

The user interface shall be intuitive and easy to navigate.

Users shall be able to complete common tasks with minimal training.

The system shall provide clear feedback for user actions.

---

### NFR-5 Scalability

The system architecture shall support future expansion of features and user growth.

Database structures shall be designed to accommodate increasing volumes of data.

---

### NFR-6 Maintainability

The application shall follow modular software design principles.

Source code shall be documented and organized to support future maintenance and enhancements.

Version control shall be maintained through Git and GitHub.

---

### NFR-7 Availability

The system should be available whenever users require access, subject to scheduled maintenance periods.

Downtime should be minimized through proper deployment and monitoring practices.

---

### NFR-8 Compatibility

The application shall function correctly on modern web browsers including:

* Google Chrome
* Mozilla Firefox
* Microsoft Edge
* Safari

The user interface shall adapt to different screen sizes and resolutions.


---

## 5. User Roles

### 5.1 Tenant

A tenant is a registered user who is interested in renting a property.

#### Responsibilities

* Browse available properties
* View property details
* Submit rental applications
* View lease information
* Track payment history
* Submit maintenance requests
* Update personal profile information

#### Permissions

* Read available property listings
* Create rental applications
* View personal lease records
* Create maintenance requests
* View personal payment records

---

### 5.2 Property Manager

A property manager is responsible for managing rental properties and tenant activities.

#### Responsibilities

* Create and manage property listings
* Review rental applications
* Approve or reject applications
* Manage lease agreements
* Track rent payments
* Manage maintenance requests
* Generate operational reports

#### Permissions

* Create properties
* Edit properties
* Delete properties
* Manage applications
* Manage leases
* View reports
* Update maintenance request statuses

---

### 5.3 Administrator

An administrator is responsible for managing the overall platform.

#### Responsibilities

* Manage user accounts
* Monitor system activity
* Manage permissions
* Maintain system integrity
* Resolve platform issues

#### Permissions

* Full system access
* User account management
* Role management
* System monitoring
* Data management


---

## 6. Use Cases

### **UC-1 Register Account**

**Actor:** Tenant, Property Manager

**Description:**
A new user creates an account in the system.

**Preconditions:**

* User is not registered.

**Main Flow:**

1. User opens registration page.
2. User enters registration information.
3. User submits registration form.
4. System validates information.
5. System creates account.
6. User receives confirmation.

**Postconditions:**

* User account is successfully created.

---

### **UC-2 Login**

**Actor:** Tenant, Property Manager, Administrator

**Description:**
A registered user logs into the platform.

**Preconditions:**

* User account exists.

**Main Flow:**

1. User enters email and password.
2. System validates credentials.
3. System authenticates user.
4. User is redirected to dashboard.

**Postconditions:**

* User gains access to authorized features.

---

### **UC-3 Browse Properties**

**Actor:** Tenant

**Description:**
A tenant views available rental properties.

**Preconditions:**

* Properties exist in the system.

**Main Flow:**

1. Tenant opens property listings page.
2. System displays available properties.
3. Tenant views property details.

**Postconditions:**

* Property information is displayed.

---

### **UC-4 Submit Rental Application**

**Actor:** Tenant

**Description:**
A tenant submits an application for a property.

**Preconditions:**

* Tenant is logged in.
* Property is available.

**Main Flow:**

1. Tenant selects a property.
2. Tenant completes application form.
3. Tenant submits application.
4. System records application.

**Postconditions:**

* Application is stored for review.

---

### **UC-5 Manage Property**

**Actor:** Property Manager

**Description:**
A manager creates, edits, or deletes property listings.

**Preconditions:**

* Manager is authenticated.

**Main Flow:**

1. Manager accesses property management page.
2. Manager performs property operations.
3. System updates database.

**Postconditions:**

* Property information is updated.

---

### **UC-6 Manage Lease**

**Actor:** Property Manager

**Description:**
A manager creates and updates lease records.

**Preconditions:**

* Approved tenant application exists.

**Main Flow:**

1. Manager creates lease.
2. Lease details are entered.
3. System stores lease information.

**Postconditions:**

* Lease record is created.

---

### **UC-7 Record Payment**

**Actor:** Property Manager

**Description:**
A manager records rent payments.

**Preconditions:**

* Active lease exists.

**Main Flow:**

1. Manager selects tenant.
2. Manager records payment.
3. System updates payment history.

**Postconditions:**

* Payment record is stored.

---

### **UC-8 Submit Maintenance Request**

**Actor:** Tenant

**Description:**
A tenant submits a maintenance request.

**Preconditions:**

* Tenant is logged in.

**Main Flow:**

1. Tenant opens maintenance form.
2. Tenant enters request details.
3. Tenant submits request.
4. System stores request.

**Postconditions:**

* Maintenance request is available for review.


---

## 7. User Stories

---

## 8. Acceptance Criteria

---

## 9. System Requirements

### Hardware Requirements

### Software Requirements
