# Language for database


- Status: 

- Deciders: everyone in the team

- Date: 2022-11-05


## Context and Problem Statement

​
What language we should use to store the transactions and user info
​

## Decision Drivers


- Local based app

- The language we can access locally 


## Considered Options

​
- Local drive

- IndexDB

- SQL(not recommend atm)

## Decision Outcome

​
Chosen option: IndexDB

​
### Positive Consequences <!-- optional -->


- 


### Negative Consequences <!-- optional -->

​
- 


## Pros and Cons of the Options <!-- optional -->


### IndexDB


This API uses indexes to enable high-performance searches of this data. While Web Storage is useful for storing smaller amounts of data, it is less useful for storing larger amounts of structured data.

IndexedDB is a tool in the Databases category of a tech stack


- pros:
  - Stores key-pair values
  - It has supported to access the data from same domain.

- cons:
  - IndexedDB API is mostly asynchronous
  - It is not a relational database
  - It is not a structured query language


## Links
