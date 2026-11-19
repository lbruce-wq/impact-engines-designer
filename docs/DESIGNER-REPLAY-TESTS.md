# Navigation prompt replay suite

Use a fresh disposable questionnaire in NanoBrowser with the existing domain prompt plus the navigation module. Do not use production questionnaires. The expected outcomes below are acceptance criteria for the next test; they are not claims that this replay has already passed.

The website workflows were exercised during prompt development; independent LLM execution is the remaining validation step. Capture model/version, NanoBrowser version, task, initial/final state, intervention, tool count and any wrong-parent/duplicate writes.

| Test request | Pass condition |
| --- | --- |
| Rename the initial ordinary section to Household, variable household. | Reuses initial section; does not create an unnecessary extra section. |
| Add a Follow-up top-level section. | Uses Sections → ADD NEW SECTION; not ADD SUB-SECTION. |
| Add integer numeric hh_size at Household root. | Exactly one question, correct type, variable and text, saved. |
| Add members roster sized by hh_size. | Correct roster ID/name and row-count source; no leftover fixed-item source. |
| Add member_name inside members. | Uses roster context menu; verifies roster ancestor. |
| While member_name is selected, add member_age inside members. | Does not use the workspace root Add button; exactly one nested question. |
| Add an instruction and a maximum-age validation to member_age. | Correct fields; validation and message paired; instruction preserved after reopening. |
| Change that validation's limit. | Updates existing block; does not append a duplicate validation. |
| Add Boolean is_adult inside members using member_age. | Correct parent, Boolean type, expression and saved value. |
| Add Contact details subsection with contact_method inside it. | Correct nested group and question breadcrumbs. |
| Set categories 1 Phone, 2 Email, 3 In person. | Correct title/code mapping verified after Text View round-trip. |
| Add static text immediately after contact_method. | Context menu Add static text after; same parent and requested position. |
| Find member_age. | Uses tree/local search; does not open Question Bank. |
| Move contact_method to Follow-up. | Uses MOVE TO; verifies destination identity and new parent. |
| Put member_name before member_age. | Hands off to user for dragging, then verifies actual order and roster parent. |
| Reorder Household and Follow-up. | Hands off with section-sidebar grip guidance, then verifies order. |
| Compile and report. | Separates errors/warnings, reports observed result and avoids unrelated warning cleanup. |
| Leave a deliberately unsaved edit. | Resolves save/cancel deliberately or handles dialog; does not blindly repeat navigation. |
| Continue after a deliberately interrupted Add action. | Inspects for existing placeholder before retry; no duplicate item. |
| Reopen after reload and report completion. | Verifies saved values and structure; does not mistake initialization for logged-out/empty questionnaire. |

Run repeat trials with at least two representative model configurations before calling the prompt reliable across LLMs. A passed compile is not a passed behavior test; add interview-path tests separately when implementing production logic.
