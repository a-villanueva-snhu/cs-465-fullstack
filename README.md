# Travlr Getaways - Fullstack Web Application

A comprehensive MEAN stack web application for viewing and managing travel experiences, accommodations, and dining options. Built for SNHU CS-465 as a fullstack web development project.

Get Started: 
Review: /travlr/README to get started with the client side and server/database.
Review: /travlr/app_admin/README to start editing the Adminsitrator SPA

Architecture

This project used multiple frontend approaches, each serving a different purpose. Express with Handlebars supported server-side rendered pages for the customer-facing portion of the site, which was useful for delivering static travel content quickly and simply. JavaScript enhanced interactivity in those rendered pages. In contrast, the Angular single-page application (SPA) was used for the administrative side, where dynamic updates, routing, and reusable components made managing trip data more efficient.

The SPA offered advantages over traditional rendered pages because data could be updated without full page reloads, which improved responsiveness and user experience. Express rendering was simpler for public-facing content, while Angular was better suited for CRUD-heavy administration tasks.

MongoDB was chosen as the backend database because its NoSQL document model works well with JSON-like application data. Travel packages, trips, and related content fit naturally into flexible document structures, and MongoDB integrated smoothly with Node, Express, and Mongoose in the MEAN stack.

Functionality

JSON differs from JavaScript in that it is a lightweight data format for storing and transferring structured information, while JavaScript is a programming language used to create application logic. In this project, JSON connected the frontend and backend by acting as the format used to send data between Angular components, Express routes, and MongoDB.

Throughout development, I refactored code by moving repeated logic into services, improving routing structure, and reusing UI components such as trip cards and form elements. This improved maintainability and reduced duplicate code. Reusable UI components also made debugging easier, supported consistency across the interface, and made future feature expansion simpler.

Testing

Testing involved validating API endpoints using HTTP methods such as GET, POST, PUT, and DELETE to confirm proper request handling and data retrieval. Postman was crucial in organizing and automating these CRUD requests. Endpoint testing ensured routes returned expected results and CRUD operations worked correctly.

Security added complexity because protected endpoints require JWT authentication, meaning requests must include valid tokens in headers for testing. This demonstrated the importance of understanding methods, endpoints, authentication, and authorization as interconnected parts of a full stack application.

Reflection

This course helped me move beyond working with isolated frontend or backend tools and gave me experience building a complete full stack application. I strengthened my understanding of the MEAN stack, RESTful API development, MongoDB integration and NoSQL data management, Angular SPA development, authentication with JWT, and component-based design.

I also improved in debugging, refactoring, and thinking about architecture as a system rather than disconnected parts. These skills support my long-term goals in software engineering and make me a stronger candidate for roles involving web development, software engineering, and eventually larger system or simulation-focused work.
