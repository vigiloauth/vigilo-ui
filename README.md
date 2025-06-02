# VigiloAuth Admin-UI

![Latest Version](https://img.shields.io/github/tag/vigiloauth/vigilo-ui?label=latest%20version)
![Github Repo Stars](https://img.shields.io/github/stars/vigiloauth/vigilo-ui?style=flat)

---

> 🧠 VigiloAuth Admin UI is the frontend interface for managing users, roles, clients, and configurations in the [VigiloAuth](https://github.com/vigiloauth/vigilo) server.

> ⚠️ The VigiloAuth Admin-UI is is under active development. You can expect rapid iterations and new features.

> License: Apache
> This server is free and open source, developed for community use and OIDF certification.

> 💬 **Join the Conversation:**
> We're gathering feedback and ideas in the discussion threads. Come share your thoughts!

---

## Table of Contents

- [VigiloAuth Admin-UI](#vigiloauth-admin-ui)
  - [Table of Contents](#table-of-contents)
  - [1. Introduction](#1-introduction)
  - [2. Features](#2-features)
  - [3. Contributing](#3-contributing)
    - [3.1. How to Contribute](#31-how-to-contribute)
    - [3.2. Commit Standards](#32-commit-standards)
    - [3.3. Commit Types](#33-commit-types)
  - [4. License](#4-license)

---

## 1. Introduction

This is the web-based Admin UI for managing the VigiloAuth server. Built with modern frontend frameworks (e.g., React + Vite), it provides secure access to administrative functionality such as:

- Managing registered clients
- Viewing and deleting users
- Issuing tokens
- Configuring realms and identity providers (future)

---

## 2. Features

- 🔐 Login with JWT via the VigiloAuth backend
- 👤 Role-based admin interface
- 📋 Manage users and clients
- ⚙️ Plug-and-play with any VigiloAuth instance
- 🎨 Responsive and modern UI

---

## 3. Contributing

We welcome contributions to improve VigiloAuth! Follow the steps below to ensure a smooth contribution process.

> _If you're a first-time contributor, check out our [Good First Issues](https://github.com/vigiloauth/vigilo-ui/issues?q=is%3Aissue%20state%3Aopen%20label%3A%22good%20first%20issue%22)._

### 3.1. How to Contribute

1. **Fork the Repository**: Create your own fork on GitHub.
2. **Clone Your Fork**: Clone it to your local development environment.
3. **Create a Branch**: Create a new branch from `master` (e.g., `feature/my-feature`).
4. **Make Your Changes**: Implement your changes in alignment with project goals.
5. **Write Tests**: Add or update tests to cover your changes.
6. **Commit Your Changes**: Use **Conventional Commits** (see below).
7. **Push Your Changes**: Push your branch to your GitHub fork.
8. **Open a Pull Request**: Submit a PR to the main repository and clearly describe your changes.

### 3.2. Commit Standards

We follow the **_Conventional Commit_** standards to ensure clear and meaningful commit messages. Use the format:

```azure
<type>[optional scope]: <description>
[optional body]
[optional footer(s)]
```

### 3.3. Commit Types

- `breaking`: Introduce a breaking change that may require users to modify their code or dependencies.
- `feat`: Add a new feature that enhances the functionality of the project.
- `fix`: Apply a bug fix that resolves an issue without affecting functionality.
- `task`: Add or modify internal functionality that supports the codebase but doesn't introduce a new feature or fix a bug (e.g., utility methods, service logic, or internal improvements).
- `docs`: Update documentation, such as fixing typos or adding new information.
- `style`: Changes that don’t affect the code’s behavior, like formatting or code style adjustments.
- `refactor`: Refactor code without adding features or fixing bugs.
- `test`: Add or modify tests.
- `chore`: Miscellaneous changes like updates to build tools or dependencies.

For more information about contributing, please read our [contribution guide](./docs/contributing/README.md)

---

## 4. License

Copyright 2024 Olivier Pimparé-Charbonneau

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
