---
name: Frontend Changes
about: Use this template for any frontend changes in HTML, CSS, or JS.
title: ''
labels: frontend changes
assignees: ''

---

# Brief Issue Description
<!-- DO NOT REMOVE THIS GUIDELINE WHEN CREATING A NEW ISSUE -->
> ### Contribution Guideline for Frontend Work
Each component in the page **_must_** be a custom component that you define in javascript. Each component must use Flex/Grid for it's UI, and cannot use tables. Each must follow the font styling used in figma and must use the same font. Do not modify the template HTML and CSS files, they are for reference only. There must be a super container (`div`, `span`, etc...) that must use flex or grid that will contain the rest of the components. Use the CSS variables as much as possible and refrain from creating your own styles as much as possible. In the event the templates do not contain the style you need, create the new styles in a **_separate_** file with the name corresponding to the page you're working on. The directory structure must be strictly followed and refrain from placing files outside the already existing directories. Do not validate a PR unless it is examined by a member that looks after the code. Any PR that includes the following (non exhaustive) features will be rejected:
- Bad directory structure
- Bad naming
- Modification of the template files for non error reasons
- Modification of files that you were not assigned for
- Bad code style (Repeated code, bad practices, use of deprecated style, etc...)
- UI component that is not a custom component
> ### Issue Description

> ### Tasks
- [ ] Task 1
- [ ] Task 2
- [ ] Task 3
