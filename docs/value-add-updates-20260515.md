# Claude Code prompt — ask me questions before starting

You are about to work on the `value-add-prototype` project. Before making any changes, you must ask me clarifying questions using the `AskUserQuestion` tool. Do not start writing or editing any code until all questions below are fully answered.

---

## Task overview

Four specific tasks need to be completed. Each one has open questions that must be resolved before implementation. Ask all questions in a single markdown output, grouped by task, before touching any file.

---

## Task 1 — Move pain points before persona in the section sequence

Ask me:

- What are the exact names or identifiers of the pain points section and the persona section in the current codebase (component names, file names, or step numbers)?
- Is the section order controlled by a central config, a steps array, or hardcoded in the layout file?
- Are there any sections that depend on the persona section appearing before pain points (for example, a section that references persona content as context for what follows)?

---

## Task 2 — Add a brief context line after pain points

The line explains: language barriers and cultural differences cause high turnover, impacting semiconductor companies expanding in Kumamoto, and the goal is helping foreign workers adapt to reduce replacement costs.

Ask me:

- Where exactly does this line appear — at the bottom of the pain points section, as a subhead, as a caption, or as a standalone element between pain points and persona?
- Is there an existing text style in the design system for this kind of contextual line (for example, a caption class, a footnote style, or a helper-text variant)?
- Should this line appear once globally after the full pain points section, or once after each individual persona's pain points block?

---

## Task 3 — Update the PDF download section with value-add copy

Ask me:

- What is the current placeholder copy in the PDF download section — paste it or point me to the file and line number?
- What is the final copy that should replace it? If you do not have it ready, should I generate a draft based on the value-add-prototype project content for your review before implementing?
- Is the PDF download section a standalone section or part of a larger CTA block?

---

## Task 4 — Change all instances of "Kikuyo" to "Ozu-1" in financials

Ask me:

- Is this change scoped only to the financials section, or should I search the entire codebase for "Kikuyo" and replace every instance?
- Are there any places where "Kikuyo" appears as a proper location name in a non-financial context (for example, map labels, persona copy, or section headers) that should NOT be changed?
- Is "Ozu-1" the exact casing and formatting required, including the hyphen?

---

## Rules for asking

- Ask all questions in a single message as a clean markdown list, grouped by task number and task name.
- Do not ask me technical decisions such as architecture, tooling, or class naming. Use your best judgement for those.
- Do not write any code, edit any file, or produce any implementation plan until I have answered every question.
- After I answer, summarize what you are about to do in a numbered list and wait for one final confirmation before starting.
