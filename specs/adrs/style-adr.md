#  Code Style ADR

- Status:

- Deciders: Jake Graven

- Date: 2021-11-05


## Context and Problem Statement
​
How should we style and structure our code so that our codebase is consistent and readable?
​

## Decision Drivers

- We want something simple and easy to install and apply

- We want something that will help us organize and add consistency to our codebase


## Considered Options

- StyleLint
  
- Human-Enforced Style Guidelines


## Decision Outcome

**Chosen option: Human-Enforced Style Guidelines**


### <ins>StyleLint</ins>

A mighty, modern CSS linter that helps you enforce consistent conventions and avoid errors in your stylesheets.

- pros:
  - can be installed as a VS Code Extension
  - default rules file can be downloaded
  - works with CSS

- cons:
  - only checks code, does not format
  - doesnt work with JavaScript


### <ins>Human-Enforced Style Guidelines</ins>

Human-Enforced Style Guidelines would be a team of people in the group responsible for enforcing consistency within the code

- pros:
  - easy to setup, can be used with no tech hassle
  - all languages can be handled by following list of guidelines

- cons:
  - not automated, may require a significant amount of work in some cases (note that this can be minimized by simplifying our style guidelines)
  - may lead to eventual human errors



## Links

- [StyleLint](https://stylelint.io/)
- [Team Style Guidelines](../style/style-guidelines.md)
