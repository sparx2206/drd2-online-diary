# General Agent Instructions

## Purpose
This document provides general guidelines for all AI agents contributing to the drd2-online-diary project.

## Language Requirement

**IMPORTANT**: This project is developed in Czech language. All user-facing content must be in Czech, including:
- User interface text and labels
- Error messages and notifications
- Documentation intended for end users
- Comments explaining business logic

Code elements (variable names, function names, class names) should follow English naming conventions for consistency with programming standards.

## Core Principles

### 1. Understand Before Acting
- Read and comprehend the issue or task fully
- Review related code and documentation
- Ask clarifying questions when needed
- Consider the broader context

### 2. Follow Project Standards
- Adhere to coding conventions defined in PROJECT.md
- Follow contribution guidelines in CONTRIBUTING.md
- Respect existing patterns and architecture
- Maintain consistency with the codebase

### 3. Make Minimal, Focused Changes
- Keep changes small and atomic
- Focus on the specific issue or task
- Avoid unrelated modifications
- Make surgical, precise edits

### 4. Ensure Quality
- Test your changes thoroughly
- Run linters and build tools
- Verify no regressions are introduced
- Maintain or improve code quality

### 5. Communicate Clearly
- Provide clear progress updates
- Document design decisions
- Write descriptive commit messages
- Explain complex changes

## Workflow

### Planning Phase
1. Analyze the issue or requirement
2. Review relevant code and documentation
3. Create a plan with clear steps
4. Identify potential challenges

### Implementation Phase
1. Make incremental changes
2. Test frequently
3. Commit logically related changes together
4. Update documentation as needed

### Verification Phase
1. Run all relevant tests
2. Verify the issue is resolved
3. Check for side effects
4. Review your own changes

### Completion Phase
1. Ensure all changes are committed
2. Verify documentation is updated
3. Provide summary of changes
4. Mark the task as complete

## Security Guidelines

### Never
- Commit secrets, API keys, or passwords
- Expose sensitive user data
- Introduce known vulnerabilities
- Bypass security measures

### Always
- Validate and sanitize inputs
- Use secure coding practices
- Follow OWASP guidelines
- Implement proper authentication and authorization

## Testing Requirements

- Write tests for new functionality
- Ensure existing tests pass
- Maintain or improve test coverage
- Include edge cases and error scenarios

## Documentation Requirements

- Update relevant documentation with changes
- Add comments for complex logic
- Document public APIs
- Keep README current

## Code Review Checklist

Before submitting changes, verify:
- [ ] Code follows project standards
- [ ] All tests pass
- [ ] Documentation is updated
- [ ] No security vulnerabilities introduced
- [ ] Changes are minimal and focused
- [ ] Commit messages are clear
- [ ] No unrelated changes included

## Common Tasks

### Bug Fixes
1. Reproduce the bug
2. Identify root cause
3. Implement minimal fix
4. Add test to prevent regression
5. Verify fix resolves issue

### Feature Implementation
1. Understand requirements
2. Design solution
3. Implement incrementally
4. Test thoroughly
5. Document usage

### Code Refactoring
1. Identify improvement opportunity
2. Plan refactoring approach
3. Make changes incrementally
4. Ensure tests still pass
5. Verify no behavior changes

### Documentation Updates
1. Identify outdated content
2. Research current state
3. Update documentation
4. Verify accuracy
5. Check formatting and links

## Collaboration

### With Other Agents
- Respect specialized agent roles
- Coordinate on overlapping tasks
- Share relevant information
- Avoid conflicting changes

### With Human Contributors
- Provide helpful context
- Be responsive to feedback
- Explain decisions clearly
- Acknowledge limitations

## Error Handling

When encountering issues:
1. Document the error clearly
2. Attempt reasonable troubleshooting
3. Seek help when stuck
4. Never hide or ignore errors
5. Report blockers promptly

## Continuous Improvement

- Learn from code review feedback
- Adapt to project evolution
- Suggest process improvements
- Stay updated on best practices

## Specialized Agents

For specific tasks, refer to specialized agent instructions:
- [Code Agent](code-agent.md) - Code implementation and bug fixes
- [Documentation Agent](documentation-agent.md) - Documentation creation and maintenance
- [Testing Agent](testing-agent.md) - Testing and quality assurance

## Resources

- [PROJECT.md](../../PROJECT.md) - Project definition and architecture
- [CONTRIBUTING.md](../../CONTRIBUTING.md) - Contribution guidelines
- [README.md](../../README.md) - Project overview

## Questions?

When in doubt:
1. Review relevant documentation
2. Check existing patterns in the codebase
3. Ask clarifying questions
4. Err on the side of caution
