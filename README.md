## Links

- GitHub Repository: https://github.com/Vikyath5/signup-form-project
- Live Demo: https://signup-form-project-iota.vercel.app/


# A Signup Form That Doesn't Suck

A polished multi-step signup form focused on good validation, user experience, accessibility, draft preservation, and secure server-side revalidation.

## Features

- Multi-step signup flow
- Blur-based validation
- HTML5 validation
- Strong password requirements
- Clear and actionable error messages
- Accessible form errors
- Error states with visual feedback
- Form data preserved during failed submissions
- Draft saving with `localStorage`
- Current step restored after refresh
- Passwords are never stored in `localStorage`
- Server-side validation with Express
- Submit button disabled during submission
- Protection against duplicate submissions
- Friendly success state

## Tech Stack

- HTML5
- CSS3
- JavaScript
- Node.js
- Express
- localStorage

## Validation Decisions

### Blur Validation

Validation errors are first shown when the user leaves a field rather than on every keystroke.

This prevents the interface from constantly showing errors while the user is still typing.

For example, an email field is checked when the user leaves the field.

### Clear Error Messages

Every validation message explains:

1. Which field has the problem
2. What is wrong
3. How the user can fix it

Example:

> Password must contain a number. Please add at least one 0-9 character.

This is more useful than vague messages such as "Invalid input."

### Client-Side Validation

Client-side validation provides immediate feedback and improves the user experience.

However, it is not treated as a security feature because users can bypass JavaScript or modify requests.

### Server-Side Validation

The Express server independently validates:

- Required fields
- Name length
- Email format
- Password length
- Uppercase letters
- Lowercase letters
- Numbers
- Special characters

The server never trusts the client-side validation.

### Preserving User Data

If validation or submission fails, the user's entered information is preserved instead of clearing the form.

This prevents users from having to re-enter everything after an error.

### Draft Saving

Non-sensitive form information is stored in `localStorage` so that refreshing the page does not erase the user's progress.

The current form step is also stored so users can return to the step they were working on.

### Password Security

Passwords and confirm-password values are intentionally excluded from `localStorage`.

Storing plaintext passwords in browser storage would create an unnecessary security risk.

### Duplicate Submission Prevention

The submit button is disabled while the signup request is being processed.

This prevents users from accidentally sending multiple requests, especially on slow networks.

### Accessibility

The form uses:

- Proper labels
- `aria-describedby`
- `aria-invalid`
- Accessible error messages
- Clear visual error states

These features help users understand validation errors, including users relying on assistive technologies.

## Project Structure

```text
signup-form/
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── server.js
├── package.json
├── package-lock.json
└── README.md