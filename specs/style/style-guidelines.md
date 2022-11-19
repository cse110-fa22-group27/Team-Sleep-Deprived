# Team Sleep Deprived Style Guidelines

## General Decisions

- **Update**: we decided that some parts of our style convention should simply be based on the "evolution" of our code and the way most people tend to style things.
- The team consensus is to use tabs instead of spaces. Note that it is common practice in HTML to indent by 2 spaces so we must decide if we wish to do that or use tabs
- If lines end up being very long, they should be wrapped
- Constitent spacing should be used (ex: consistent spacing between functions). VSCode has tools for auto-formatting HTML and JS files (CSS too I think) so this can help us determine spacing conventions

## Naming Conventions

- In JS, use descriptiveCamelCase for things like variables. Classes can be named in UpperCamelCase and accessory files and images can be named like image-file.png or markdown-file.md (file-name.ext)
- HTML classes, IDs, and other related things can be named like file-name.ext (note this convention may "evolve" later on)
- **Avoid** acronyms, abbreviations, and odd names
- ***Changing names of files and variables will be very hard to do later on, so we should focus on getting that right now!***


## Other Notes

- Ideally, we will properly break the webapp up into different components and pages. These things should follow a consistent set of naming principles (likely based on the "evolution" / what most people tend to do)
- ***Consistency is key for all guidelines***. Code should be reviewed by the same set of people to ensure that each file is formatted consistently. Even if the style ends up slightly different from the guidelines in this document, it will be fine as long as the code being committed follows a general set of consistent principles
