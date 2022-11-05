# Deciding Unit-Testing Framework for FrontEnd


- Status: 

- Deciders: Team

- Date: 2022-11-05


## Context and Problem Statement

What framework should we choose to automate unit-testing for the front end of our web app?
​
## Decision Drivers

- We want to minimize complexity 
- We have a short time frame to implement
- We want to maximize workflow efficiency


## Considered Options
- Jest
- Jasmine
- Mocha
## Decision Outcome

​
Chosen option: Jest, because it requires no additional setup thus meeting the time constraint of the project, while still maintaining key functionalities. 

​
### Positive Consequences <!-- optional -->
- No setup
- Maintained and well documented
- Support for asynchronous code and snapshot testing (to compare visual outputs)

### Negative Consequences <!-- optional -->​
- Does not support as many libraries
- Slight learning curve

## Pros and Cons of the Options <!-- optional -->


### Jasmine
Use Jasmine instead of Jest
- Good, because compatible with almost every framework library
- Good, because it offers clean syntax
- Bad, because setup is complex
- Bad, because asynchronous testing is difficult
### Mocha
Use Mocha instead of Jest
- Good, because the API is clear and simple
- Good, because it allows testing of different browsers
- Bad, because it requires a lot of configuration and setup
- Bad, because it contains a lot of complexity
- Bad, because it is difficult to do snapshot testing

## Links
