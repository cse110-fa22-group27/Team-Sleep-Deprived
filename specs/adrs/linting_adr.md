# Tool to Use for code linting

​

- Status: 

- Deciders: 

- Date: 2021-11-05

​

## Context and Problem Statement

​

How should we store user created content and preferences? Specifically, how should user and community recipes be stored and served?

​

## Decision Drivers

​

- Tool installation should be simple

- Tool that we can use with our current tools/programming languages

​

## Considered Options

​

- CSSLint

- StyleLint
  - pros:
    - can be installed as a VS Code Extension
    - default rules file can be downloaded
    - works with CSS

  - cons:
    - only checks code, does not format

- ESLint
  - pro:
    - works with JavaScript

​

## Decision Outcome

​

Chosen option:

​

### Positive Consequences <!-- optional -->

​

- 

​

### Negative Consequences <!-- optional -->

​

- 

​

## Pros and Cons of the Options <!-- optional -->


### CSSLint



- pros:
  - dont need installation, can use web application where you paste code
  - works with CSS
- cons:
  - installs/runs on command line
  - VS Code extensions is not fully supported
​

​

### StyleLint

​

A mighty, modern CSS linter that helps you enforce consistent conventions and avoid errors in your stylesheets.


- pros:
  - can be installed as a VS Code Extension
  - default rules file can be downloaded
  - works with CSS

  cons:
  - only checks code, does not format
  - doesnt work with JavaScript

​


### ESLint

​

A pluggable and configurable linter tool for identifying and reporting on patterns in JavaScript. Maintain your code quality with ease.

​
- pros:
  - works with JavaScript
  - VS Code Extension
- cons:
  - doesnt work with CSS

​

## Links