# Skill Registry — icifg003-eq11

## Project Context

- **Stack**: Spring Boot 2.5.9 (Java 17, Lombok, JPA/Hibernate, PostgreSQL) + Angular 21
- **Base package**: `com.example.demo`
- **Persistence**: `javax.persistence.*` (NOT `jakarta.persistence.*`)
- **Repositories**: `CrudRepository` (NOT `JpaRepository`)
- **API prefix**: `/api/v1/{resource}`
- **CORS**: per-controller to `http://localhost:4200`

## Project Conventions

Read these files for project-specific patterns:
- `/home/benja/dev/aplicaciones/AGENTS.md` — Architecture, commands, known gaps, gotchas
- `/home/benja/dev/aplicaciones/DBA.md` — Canonical entity model (source of truth for entities)

## Compact Rules

### sdd-init
- Detect stack, test tools, persistence mode; never guess.
- In engram mode, do NOT create `openspec/`.
- Always persist testing capabilities separately and build `.atl/skill-registry.md`.
- strict_tdd: true only if test runner exists AND is configured; false if no runner.

### sdd-apply
- Read tasks + spec + design + apply-progress before writing code.
- Follow task order; mark each task done after implementation.
- Save apply-progress after each batch.
- Strict TDD: write failing test → implement → green → refactor.

### sdd-verify
- Read spec + tasks + apply-progress.
- Execute tests and validate implementation matches specs.
- Report CRITICAL / WARNING / SUGGESTION.

### sdd-explore
- Investigate ideas before committing. No files created.
- Save exploration to engram as `sdd/{change-name}/explore`.

### sdd-propose
- Create change proposal: intent, scope, approach.
- Save as `sdd/{change-name}/proposal` in engram.

### sdd-spec
- Write delta specs with requirements and scenarios.
- Requires proposal artifact. Save as `sdd/{change-name}/spec`.

### sdd-design
- Create technical design and architecture approach.
- Requires proposal. Save as `sdd/{change-name}/design`.

### sdd-tasks
- Break change into implementation tasks.
- Requires spec + design. Save as `sdd/{change-name}/tasks`.
- Report review workload forecast (lines changed, chained PR recommendation).

### sdd-archive
- Sync delta specs and persist final state.
- Save as `sdd/{change-name}/archive-report`.

### branch-pr
- Create PRs with issue-first checks.
- Conventional commit messages, no Co-Authored-By.

### work-unit-commits
- Plan commits as reviewable work units.
- Keep tests and docs with code in same commit.

## User Skills

| Skill | Trigger | Path |
|-------|---------|------|
| branch-pr | creating, opening, or preparing PRs | ~/.config/opencode/skills/branch-pr/SKILL.md |
| chained-pr | PRs over 400 lines, stacked PRs | ~/.config/opencode/skills/chained-pr/SKILL.md |
| cognitive-doc-design | writing guides, READMEs, RFCs | ~/.config/opencode/skills/cognitive-doc-design/SKILL.md |
| comment-writer | PR feedback, issue replies, reviews | ~/.config/opencode/skills/comment-writer/SKILL.md |
| go-testing | Go tests, go test coverage | ~/.config/opencode/skills/go-testing/SKILL.md |
| issue-creation | creating GitHub issues, bug reports | ~/.config/opencode/skills/issue-creation/SKILL.md |
| judgment-day | judgment day, dual review | ~/.config/opencode/skills/judgment-day/SKILL.md |
| sdd-apply | implement SDD tasks | ~/.config/opencode/skills/sdd-apply/SKILL.md |
| sdd-archive | archive completed SDD change | ~/.config/opencode/skills/sdd-archive/SKILL.md |
| sdd-design | create technical design | ~/.config/opencode/skills/sdd-design/SKILL.md |
| sdd-explore | explore ideas before committing | ~/.config/opencode/skills/sdd-explore/SKILL.md |
| sdd-init | initialize SDD context | ~/.config/opencode/skills/sdd-init/SKILL.md |
| sdd-onboard | guided SDD walkthrough | ~/.config/opencode/skills/sdd-onboard/SKILL.md |
| sdd-propose | create change proposal | ~/.config/opencode/skills/sdd-propose/SKILL.md |
| sdd-spec | write delta specs | ~/.config/opencode/skills/sdd-spec/SKILL.md |
| sdd-tasks | break change into tasks | ~/.config/opencode/skills/sdd-tasks/SKILL.md |
| sdd-verify | verify SDD implementation | ~/.config/opencode/skills/sdd-verify/SKILL.md |
| skill-creator | new skills, agent instructions | ~/.config/opencode/skills/skill-creator/SKILL.md |
| skill-registry | update skill registry | ~/.config/opencode/skills/skill-registry/SKILL.md |
| work-unit-commits | plan commits as work units | ~/.config/opencode/skills/work-unit-commits/SKILL.md |