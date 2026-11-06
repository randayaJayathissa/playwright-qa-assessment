# Playwright Automation Assessment

## Overview
Automated UI testing project developed using Playwright Test and TypeScript.

The project covers two applications:
- **Playwright Documentation:** Homepage verification, navigation, heading validation, and search functionality.
- **TodoMVC:** Adding, completing, filtering, editing, and deleting todos.

## Technologies
- TypeScript
- Playwright Test
- Node.js
- Chromium

## Installation

```bash
npm install
npx playwright install chromium
```

## Running Tests

Run all tests:

```bash
npx playwright test --project=chromium
```

Run documentation tests:

```bash
npx playwright test tests/docs.spec.ts --project=chromium
```

Run TodoMVC tests:

```bash
npx playwright test tests/todo.spec.ts --project=chromium
```

Run tests with the browser visible:

```bash
npx playwright test --project=chromium --headed
```

## HTML Report

Generate the report by running the tests, then open it using:

```bash
npx playwright show-report
```

## Project Structure

- `pages/` – Page Object Model implementations.
- `tests/` – Automated test cases.
- `playwright.config.ts` – Playwright configuration.

## Test Coverage

### Documentation Website
- Homepage title verification.
- Navigation to documentation.
- Installation heading verification.
- Search for locators.

### TodoMVC
- Add three todos.
- Complete a todo and verify remaining count.
- Filter active and completed todos.
- Edit a todo.
- Delete a todo.
- Clear completed todos while preserving active todos.
