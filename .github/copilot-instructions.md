# Copilot Instructions for drd2-online-diary

## Language Requirement - CRITICAL

**IMPORTANT**: This project is developed in **Czech language**. All user-facing content MUST be in Czech, including:
- User interface text and labels
- Error messages and notifications
- Documentation intended for end users
- Comments explaining business logic
- Commit messages

Code elements (variable names, function names, class names) should follow English naming conventions for consistency with programming standards.

## Project Context

This is an online diary application (drd2-online-diary) designed to provide users with a secure and intuitive platform for recording their daily thoughts, experiences, and reflections.

### Core Features
- User-friendly interface for creating and managing diary entries
- Data security and privacy for user content
- Search and retrieval of past entries
- Rich text formatting and media attachments
- Tagging and categorization
- Mood tracking and analytics

## Architecture & Technology

### Core Components
1. **User Management**: User registration, authentication, and profile management
2. **Diary Entry System**: CRUD operations with rich text editor and media support
3. **Search and Organization**: Full-text search, tag-based filtering, date navigation
4. **Data Security**: Encrypted storage, secure authentication, data backup

## Coding Standards

### Code Quality
- Write modular, reusable code
- Keep functions focused and small
- Use meaningful variable and function names
- Add comments for complex logic (in Czech for business logic)
- Follow language-specific best practices
- Maintain comprehensive documentation

### Security - CRITICAL
- **NEVER** commit secrets, API keys, passwords, or sensitive data
- **ALWAYS** validate and sanitize inputs
- Use environment variables for configuration
- Implement proper authentication and authorization
- Follow OWASP security guidelines
- Implement proper error handling

### Testing Requirements
- Write unit tests for new functionality
- Ensure existing tests pass before submitting changes
- Maintain or improve test coverage (aim for 80%+)
- Include edge cases and error scenarios
- Test error handling and boundary conditions

## Development Workflow

### Before Starting Work
1. Read and understand the issue or feature request fully
2. Review related code and documentation
3. Plan your approach with clear steps
4. Identify potential edge cases and challenges

### During Development
1. Make small, focused, atomic commits
2. Test changes frequently
3. Update documentation as needed
4. Follow existing patterns and architecture
5. Ensure backward compatibility when possible

### Before Submitting
1. Run all tests and linters
2. Verify no regressions are introduced
3. Review your own changes
4. Update relevant documentation
5. Write clear, descriptive commit messages (in Czech)

## Common Tasks Guidelines

### Bug Fixes
1. Reproduce the bug
2. Identify root cause
3. Implement minimal fix
4. Add test to prevent regression
5. Verify fix resolves issue

### Feature Implementation
1. Understand requirements thoroughly
2. Design solution following project architecture
3. Implement incrementally
4. Test thoroughly (unit, integration, e2e)
5. Document usage

### Code Refactoring
1. Make changes incrementally
2. Ensure tests still pass
3. Verify no behavior changes
4. Maintain or improve code quality

## Code Review Checklist

Before submitting changes, verify:
- [ ] Code follows project standards
- [ ] All tests pass
- [ ] Documentation is updated (in Czech where appropriate)
- [ ] No security vulnerabilities introduced
- [ ] Changes are minimal and focused
- [ ] Commit messages are clear and in Czech
- [ ] No unrelated changes included
- [ ] No sensitive data or credentials committed

## Error Handling

- Implement comprehensive error handling
- Provide clear error messages (in Czech for users)
- Never hide or ignore errors
- Log errors appropriately
- Handle edge cases gracefully

## Documentation

- Update API documentation for backend services
- Document components for frontend
- Keep README current
- Add user guides and tutorials (in Czech)
- Document deployment and maintenance procedures

## Resources

- [PROJECT.md](../PROJECT.md) - Project definition and architecture
- [CONTRIBUTING.md](../CONTRIBUTING.md) - Contribution guidelines
