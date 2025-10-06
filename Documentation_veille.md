# Technological Watch Summary

## 1. HTML/CSS/JS Best Practices
- **HTML5**: Use of semantic tags (header, nav, section, article, footer) for accessibility and SEO. Validation with W3C tools to ensure compliance and interoperability.
- **CSS3**: Responsive design via media queries, mobile-first approach, and use of modern layout techniques (Flexbox, Grid). Optimization for performance and maintainability (modular CSS, specificity management).
- **JavaScript**: Vanilla JS for interactivity (menu, slider, dynamic content) to reduce dependencies and improve performance. Progressive enhancement and unobtrusive scripting.

## 2. Security
- **Frontend**: Avoid inline scripts/styles, use HTTPS for all resources, and validate user input on forms.
- **Backend**: (Node.js/Express) Use of environment variables for secrets, CORS policy, input validation, and regular dependency updates. No sensitive data in the frontend code.
- **General**: GitHub repository is private or protected, and secrets are never committed.

## 3. RGAA (French Accessibility Standard)
- Use of sufficient color contrast and readable font sizes.
- All images have meaningful `alt` attributes.
- Navigation is keyboard-accessible (tabindex, focus states).
- Use of ARIA roles and landmarks where necessary.
- HTML structure validated for accessibility (heading order, form labels, etc.).

## References
- [MDN Web Docs](https://developer.mozilla.org/)
- [W3C HTML & CSS Validators](https://validator.w3.org/)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [RGAA Reference](https://accessibilite.numerique.gouv.fr/)

---
This summary documents the main points of our technological watch for the AgencEco project.
 
## 4. Concrete Examples and Tools Used

- **HTML/CSS/JS**
	- HTML validation: [W3C Validator](https://validator.w3.org/)
	- CSS validation: [W3C CSS Validator](https://jigsaw.w3.org/css-validator/)
	- Responsive design tested with Chrome DevTools (mobile emulation)
	- Accessibility checked with [axe DevTools](https://www.deque.com/axe/devtools/) and [Lighthouse](https://developers.google.com/web/tools/lighthouse)
	- JavaScript code reviewed for ES6+ best practices and performance

- **Security**
	- Use of [npm audit](https://docs.npmjs.com/cli/v8/commands/npm-audit) to detect vulnerabilities in dependencies
	- HTTPS enforced for all production resources
	- No sensitive data in the repository (checked with [git-secrets](https://github.com/awslabs/git-secrets))

- **RGAA**
	- Color contrast checked with [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
	- Keyboard navigation tested on all forms and menus
	- Images checked for relevant alt text
	- Headings and landmarks reviewed for logical structure

## 5. Continuous Monitoring

- Subscribed to newsletters and updates from MDN, W3C, and OWASP
- Regularly check [Can I use](https://caniuse.com/) for browser compatibility
- Follow security advisories for Node.js and frontend libraries

---
This documentation is updated as new best practices and tools emerge.
