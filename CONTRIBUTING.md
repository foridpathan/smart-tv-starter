# Contributing Guidelines for Smart TV Starter Application

Thank you for considering contributing to the Smart TV Starter Application! We welcome all contributions to help improve the project and adapt it for Tizen and WebOS platforms. Please follow these guidelines to ensure a smooth collaboration.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Development Setup](#development-setup)
3. [Issues and Bug Reports](#issues-and-bug-reports)
4. [Pull Request Process](#pull-request-process)
5. [Coding Standards](#coding-standards)
6. [Platform-Specific Builds](#platform-specific-builds)
7. [Testing](#testing)
8. [Code of Conduct](#code-of-conduct)

---

## Getting Started

1. **Fork the repository** to your own GitHub account.
2. **Clone your forked repository** to your local development environment:

```bash
   git clone https://github.com/your-username/smart-tv-starter-app.git
   cd smart-tv-starter-app
```
3.	Set up the project according to the Development Setup section below.

Development Setup

1.	Install Dependencies: Run the following command to install project dependencies:
```bash
npm install
```

2.	Start Development Server: Use the following command to run the development server:
```bash
npm run dev
```

3.	Build for Specific Platforms:
  •	Tizen: npm run platform:tizen
  •	WebOS: npm run platform:webos
  •	Production: npm run build
4.	Configure Environment: Configure your .env file based on the platform you are targeting, and ensure necessary files (config.xml for Tizen, appinfo.json for WebOS) are in place in the config directory.

Issues and Bug Reports

If you encounter any bugs or issues, please open an issue in the repository and include the following:

•	A clear title and description.
•	Steps to reproduce the problem.
•	Expected and actual behavior.
•	Screenshots, if applicable.

Pull Request Process

1.	Create a Branch: Use a descriptive branch name that represents the change:
`
git checkout -b feature/your-feature-name
`

2.	Commit Messages: Follow conventional commit messages with a prefix (e.g., feat, fix, docs, style). Example:

feat: add navigation support for new media component


3.	Submit a Pull Request (PR):
	•	Ensure your PR targets the main branch.
	•	Provide a clear description of your changes and link any relevant issues.
	•	If applicable, include screenshots or videos of new functionality.
	•	After submitting, respond to any feedback provided by the maintainers.
	4.	Update Documentation: If your changes impact the setup or usage, update the relevant documentation files.

Coding Standards

1.	JavaScript/TypeScript: Follow ES6 standards.
2.	React Component Structure: Prefer functional components with hooks where possible.
3.	CSS & Styling: Use Tailwind CSS for styling. If custom styles are needed, include them in appropriate .css files.
4.	Code Quality: Ensure all code is linted, formatted, and follows best practices for readability and maintainability.

Platform-Specific Builds
	•	Tizen: Run npm run platform:tizen. This will build the project for Tizen, copying the necessary configurations to the build/tizen folder.
	•	WebOS: Run npm run platform:webos. This will build the project for WebOS in the build/webos/uhd folder.
	•	Production: Run npm run build to create platform-specific builds in sequence.

Note: For Windows users, replace export with set in package.json scripts.

Testing

1.	Unit Tests: All new features should include unit tests. The testing setup uses jsdom for a simulated DOM environment. Ensure tests are located in src/__tests__ and follow the naming conventions.
2.	Run Tests: To execute the test suite, use:

```bash
npm test
```

3.	Focusable Components: For Smart TV navigation, ensure all new focusable components are compatible with the spatial navigation library.

Code of Conduct

Please be respectful in interactions and responsive to feedback. We follow a Code of Conduct to ensure a welcoming environment for all.

Thank you for your contributions to the Smart TV Starter Application!
