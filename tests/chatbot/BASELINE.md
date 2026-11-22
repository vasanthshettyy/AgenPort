# Chatbot QA Baseline Report

Generated: 2026-11-22T06:03:44.816Z  
Target: `src/chatbot/search.js` against `src/chatbot/kb.js` (59 KB entries)

---

## 1. Executive Summary

| Metric | Default Suite (Regression + Tuning) | Holdout Suite (`--holdout`) |
| :--- | :--- | :--- |
| **Total Test Queries** | **238** | **107** |
| **Passed Queries** | **133** | **59** |
| **Failed Queries** | **105** | **48** |
| **Overall Pass Rate** | **55.9%** | **55.1%** |
| **False Positives** | **11** | **7** |
| **Average Query Latency** | **10.002 ms** | **8.397 ms** |

> **Note on Generalization**: The holdout pass rate (**55.1%**) closely matches the tuning pass rate (**55.9%**), demonstrating consistent performance across unseen test queries without severe split bias.

---

## 2. Category Performance Breakdown

### Default Suite (Regression + Tuning)

| Category | Total | Passed | Failed | Pass Rate | False Positives |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **regression** | 22 | 16 | 6 | 72.7% | 0 |
| **natural** | 87 | 22 | 65 | 25.3% | 3 |
| **keyword** | 26 | 23 | 3 | 88.5% | 3 |
| **typos** | 24 | 18 | 6 | 75.0% | 2 |
| **slang** | 17 | 7 | 10 | 41.2% | 0 |
| **compound** | 11 | 9 | 2 | 81.8% | 0 |
| **business** | 7 | 0 | 7 | 0.0% | 2 |
| **out_of_scope** | 20 | 20 | 0 | 100.0% | 0 |
| **adversarial** | 16 | 16 | 0 | 100.0% | 0 |
| **honesty_traps** | 8 | 2 | 6 | 25.0% | 1 |
| **OVERALL** | **238** | **133** | **105** | **55.9%** | **11** |

### Holdout Suite (`--holdout`)

| Category | Total | Passed | Failed | Pass Rate | False Positives |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **natural** | 37 | 11 | 26 | 29.7% | 4 |
| **keyword** | 16 | 15 | 1 | 93.8% | 1 |
| **typos** | 7 | 6 | 1 | 85.7% | 0 |
| **slang** | 8 | 4 | 4 | 50.0% | 0 |
| **compound** | 5 | 5 | 0 | 100.0% | 0 |
| **business** | 9 | 2 | 7 | 22.2% | 2 |
| **out_of_scope** | 6 | 6 | 0 | 100.0% | 0 |
| **adversarial** | 10 | 10 | 0 | 100.0% | 0 |
| **honesty_traps** | 4 | 0 | 4 | 0.0% | 0 |
| **hinglish** | 5 | 0 | 5 | 0.0% | 0 |
| **OVERALL** | **107** | **59** | **48** | **55.1%** | **7** |

---

## 3. Hinglish & Regional Evaluation (Report-Only)

*Note: As per specification, Hinglish queries are evaluated for reporting purposes only and excluded from formal pass rates.*

1. **"website ka price kitna hai"**
   - Expected: `[pricing]`
   - Returned: `"fallback"` (MISMATCH / FALLBACK)
   - Candidates: `pricing` (0.333), `included` (0.325), `custom-code` (0.286)

2. **"website banane me kitna time lagega"**
   - Expected: `[timeline]`
   - Returned: `"fallback"` (MISMATCH / FALLBACK)
   - Candidates: `custom-code` (0.284), `booking` (0.284), `redesign` (0.284)

3. **"kya aap ecommerce online store banate ho"**
   - Expected: `[online-store]`
   - Returned: `"fallback"` (MISMATCH / FALLBACK)
   - Candidates: `online-store` (0.444), `data-collected` (0.242), `booking` (0.222)

4. **"purani website redesign kar sakte ho kya"**
   - Expected: `[redesign]`
   - Returned: `"fallback"` (MISMATCH / FALLBACK)
   - Candidates: `redesign` (0.444), `custom-code` (0.222), `booking` (0.222)

5. **"website banwane ke liye kya kya chahiye"**
   - Expected: `[need-from-me]`
   - Returned: `"fallback"` (MISMATCH / FALLBACK)
   - Candidates: `custom-code` (0.222), `booking` (0.222), `redesign` (0.222)

6. **"google search me meri site aayegi kya"**
   - Expected: `[seo]`
   - Returned: `"seo"` (MATCH)
   - Candidates: `seo` (0.497), `landing` (0.248), `starter` (0.248)

7. **"payment kaise karna hota hai upfront ya baad me"**
   - Expected: `[payment]`
   - Returned: `"fallback"` (MISMATCH / FALLBACK)
   - Candidates: `payment` (0.221), `greeting` (0.188), `thanks-bye` (0)

8. **"vasanth se contact kaise kare"**
   - Expected: `[contact]`
   - Returned: `"fallback"` (MISMATCH / FALLBACK)
   - Candidates: `contact` (0.333), `who` (0.331), `what-he-does` (0.325)

9. **"websitege eshtu karchu aguthe"**
   - Expected: `[pricing]`
   - Returned: `"fallback"` (MISMATCH / FALLBACK)
   - Candidates: `custom-code` (0.267), `booking` (0.267), `redesign` (0.267)

10. **"site madoke eshtu dina beku"**
   - Expected: `[timeline]`
   - Returned: `"fallback"` (MISMATCH / FALLBACK)
   - Candidates: `starter` (0.286), `growth` (0.286), `redesign` (0.284)

11. **"nimmanna contact madodu hege"**
   - Expected: `[contact]`
   - Returned: `"fallback"` (MISMATCH / FALLBACK)
   - Candidates: `contact` (0.4), `phone` (0.333), `contract` (0.32)

12. **"nanna shop ge ondu website beku"**
   - Expected: `[which-plan, start, for-whom]`
   - Returned: `"fallback"` (MISMATCH / FALLBACK)
   - Candidates: `custom-code` (0.25), `booking` (0.25), `redesign` (0.25)

**Hinglish Match Rate**: **1 / 12** (**8.3%**)

---

## 4. Key Failure Patterns & Root Cause Analysis

1. **Length / Harmonic Mean Penalty in Natural Queries (Pass Rate: ~25.3%)**:
   - `scoreQueryAgainstPhrase` computes harmonic mean $2 \times \text{recall} \times \text{precision} / (\text{recall} + \text{precision})$.
   - In long, chatty natural queries (e.g. *"Can you write the text and find photos for my website, or do I have to provide everything?"*), the query length severely dilutes query recall against short target phrases (e.g. *"what do you need from me"*), pulling scores below the `0.45` confidence threshold (e.g., scores land around 0.35–0.42).
2. **Business Industry Intent Misses (Pass Rate: 0.0%)**:
   - Queries like *"I need a website for my dental clinic"* or *"I have a local plumbing service and need a lead generation website"* lack specific tokens present in `which-plan` or `for-whom` questions, causing them to fall back.
3. **Slang / Informal Contractions (Pass Rate: ~41.2%)**:
   - While short typos work via Levenshtein (`isWordMatch`), extreme SMS slang (`hw`, `abt`, `wat`, `pg`) fails length thresholds (`maxLen <= 3` returns 0 in Levenshtein).
4. **Adversarial & Out-of-Scope (Pass Rate: 100.0%)**:
   - The search engine correctly rejected 100% of adversarial attacks, prompt injections, script payloads, gibberish, and out-of-scope queries by dropping them cleanly to `fallback`.

---

## 5. Ambiguity Analysis (Multiple Reasonable KB Entries)

The following scenarios were flagged where multiple entries are logically reasonable:

1. **Pricing vs. Specific Plan**:
   - *"Is a basic website exactly 10000 rupees?"* -> Could reasonably route to `pricing` (scoped individually) or `starter` (basic plan details).
   - *"What is the Standard plan and how much does it cost?"* -> Legitimate dual-intent for `standard` and `pricing`.
2. **Redesign vs. Services**:
   - *"Can you redesign my old website?"* -> Relates to both `redesign` and `what-he-does`.
3. **Contact vs. Call / Start**:
   - *"How do I contact you or start a project?"* -> Handled by `start` or `contact`.
   - *"Can we jump on a call abt this"* -> Routes to `call` or `contact`.
4. **Code Ownership vs. Hosting**:
   - *"Will I own the code and do you handle hosting?"* -> Bridges `ownership` and `hosting`.
5. **Business Type Queries**:
   - *"I need a website for my bakery / gym / law firm"* -> Logically matches `which-plan` (selecting plan), `for-whom` (client types), or `start` (getting started).

---

## 6. KB Entry Coverage & Dead Entry Analysis

- **Target Coverage**: **100%** of all 59 KB entries are explicitly targeted as expected in the test suite (`neverExpected: 0`).
- **Engine Dead Entries (Entries never returned by current `search()` across all tests)**:
  1. `thanks-bye` (Polite exit phrases get scored below 0.45 or overtaken)
  2. `help` (Diluted by general assistant queries)
  3. `custom-code` (Overtaken by `tech-stack` or `starter`)
  4. `hidden-fees` (Overtaken by `payment` or `care`)
  5. `included` (Diluted by broad "what comes with" phrasing)
  6. `data-use` (Overtaken by broader `privacy` or `data-collected`)
  7. `data-retention` (Overtaken by general data entries)
  8. `data-rights` (Overtaken by general data entries)

---

## 7. Full Failure Log (Default Suite: Regression + Tuning)

### [1] Category: `regression`
- **Question**: "Do I have to pay you every month after the site is done?"
- **Expected**: `[hidden-fees, care]`
- **Returned**: `"fallback"`
- **Top Candidates**: `need-from-me` (0.367), `payment` (0.26), `client-work` (0.234)
- **Context**: Fixed 22 core regression suite

### [2] Category: `regression`
- **Question**: "do you pay for my domain name and hosting?"
- **Expected**: `[hosting]`
- **Returned**: `"fallback"`
- **Top Candidates**: `payment` (0.389), `hosting` (0.381), `hidden-fees` (0.272)
- **Context**: Fixed 22 core regression suite

### [3] Category: `regression`
- **Question**: "o you pay for my domain name and hosting?"
- **Expected**: `[hosting]`
- **Returned**: `"fallback"`
- **Top Candidates**: `payment` (0.323), `hosting` (0.323), `hidden-fees` (0.241)
- **Context**: Fixed 22 core regression suite

### [4] Category: `regression`
- **Question**: "Can you write the text and find photos for my website, or do I have to provide everything?"
- **Expected**: `[need-from-me]`
- **Returned**: `"fallback"`
- **Top Candidates**: `need-from-me` (0.396), `phone` (0.22), `ownership` (0.216)
- **Context**: Fixed 22 core regression suite

### [5] Category: `regression`
- **Question**: "Will my website show up on Google?"
- **Expected**: `[seo]`
- **Returned**: `"fallback"`
- **Top Candidates**: `pricing` (0.415), `design-approval` (0.349), `redesign` (0.294)
- **Context**: Fixed 22 core regression suite

### [6] Category: `regression`
- **Question**: "hw much for landing pg"
- **Expected**: `[pricing]`
- **Returned**: `"fallback"`
- **Top Candidates**: `pricing` (0.392), `landing` (0.331), `hosting` (0.325)
- **Context**: Fixed 22 core regression suite

### [7] Category: `natural`
- **Question**: "Thanks a lot for the info, have a good one!"
- **Expected**: `[thanks-bye]`
- **Returned**: `"fallback"`
- **Top Candidates**: `thanks-bye` (0.278), `greeting` (0.244), `client-work` (0.241)
- **Context**: thanks-bye kb entry

### [8] Category: `natural`
- **Question**: "Okay that explains everything, bye for now!"
- **Expected**: `[thanks-bye]`
- **Returned**: `"fallback"`
- **Top Candidates**: `help` (0.413), `thanks-bye` (0.284), `ai-chatbots` (0.211)
- **Context**: thanks-bye kb entry

### [9] Category: `natural`
- **Question**: "I feel a bit lost, what can I ask this assistant?"
- **Expected**: `[help]`
- **Returned**: `"fallback"`
- **Top Candidates**: `help` (0.322), `chat-privacy` (0.262), `about-bot` (0.241)
- **Context**: help kb entry

### [10] Category: `natural`
- **Question**: "Can you give me a quick overview of what you can assist with?"
- **Expected**: `[help]`
- **Returned**: `"fallback"`
- **Top Candidates**: `post-launch` (0.201), `greeting` (0), `thanks-bye` (0)
- **Context**: help kb entry

### [11] Category: `natural`
- **Question**: "Are you a real human or an automated AI assistant?"
- **Expected**: `[about-bot]`
- **Returned**: `"fallback"`
- **Top Candidates**: `about-bot` (0.346), `ai-chatbots` (0.32), `contact` (0.286)
- **Context**: about-bot kb entry

### [12] Category: `natural`
- **Question**: "Why should I choose you over hiring a traditional creative agency?"
- **Expected**: `[solo]`
- **Returned**: `"fallback"`
- **Top Candidates**: `solo` (0.443), `which-plan` (0.216), `included` (0.182)
- **Context**: solo kb entry

### [13] Category: `natural`
- **Question**: "What is the benefit of working with an independent freelancer like you?"
- **Expected**: `[solo]`
- **Returned**: `"fallback"`
- **Top Candidates**: `solo` (0.272), `location` (0.272), `unhappy` (0.247)
- **Context**: solo kb entry

### [14] Category: `natural`
- **Question**: "Do you rely on pre-made WordPress templates or write custom code?"
- **Expected**: `[custom-code]`
- **Returned**: `"fallback"`
- **Top Candidates**: `custom-code` (0.392), `tech-stack` (0.234), `ownership` (0.203)
- **Context**: custom-code kb entry

### [15] Category: `natural`
- **Question**: "I need clients to schedule appointments directly on my calendar from the website."
- **Expected**: `[booking]`
- **Returned**: `"fallback"`
- **Top Candidates**: `need-from-me` (0.383), `which-plan` (0.223), `booking` (0.216)
- **Context**: booking kb entry

### [16] Category: `natural`
- **Question**: "Can you integrate a Calendly or booking system into my new site?"
- **Expected**: `[booking]`
- **Returned**: `"fallback"`
- **Top Candidates**: `booking` (0.432), `call` (0.242), `redesign` (0.226)
- **Context**: booking kb entry

### [17] Category: `natural`
- **Question**: "I only need a single-page landing page for a product launch."
- **Expected**: `[landing]`
- **Returned**: `"axiom"`
- **Top Candidates**: `axiom` (0.656), `landing` (0.536), `mobile` (0.328)
- **Context**: landing kb entry

### [18] Category: `natural`
- **Question**: "Can you build an intelligent AI chatbot like this one for my own business?"
- **Expected**: `[ai-chatbots]`
- **Returned**: `"fallback"`
- **Top Candidates**: `ai-chatbots` (0.368), `about-bot` (0.354), `who` (0.302)
- **Context**: ai-chatbots kb entry

### [19] Category: `natural`
- **Question**: "Can you build a full e-commerce shop with inventory and payments?"
- **Expected**: `[online-store]`
- **Returned**: `"fallback"`
- **Top Candidates**: `online-store` (0.432), `what-he-does` (0.262), `ai-chatbots` (0.245)
- **Context**: online-store kb entry

### [20] Category: `natural`
- **Question**: "How do you ensure my site will rank well on search engines like Google?"
- **Expected**: `[seo]`
- **Returned**: `"fallback"`
- **Top Candidates**: `seo` (0.363), `data-use` (0.291), `ownership` (0.282)
- **Context**: seo kb entry

### [21] Category: `natural`
- **Question**: "Do your websites include on-page SEO optimization?"
- **Expected**: `[seo]`
- **Returned**: `"fallback"`
- **Top Candidates**: `landing` (0.442), `seo` (0.325), `mobile` (0.28)
- **Context**: seo kb entry

### [22] Category: `natural`
- **Question**: "Can I easily edit my blog posts and content through a CMS?"
- **Expected**: `[cms]`
- **Returned**: `"fallback"`
- **Top Candidates**: `cms` (0.398), `need-from-me` (0.242), `revisions` (0.206)
- **Context**: cms kb entry

### [23] Category: `natural`
- **Question**: "Do you hook up content management systems like Sanity or Strapi?"
- **Expected**: `[cms]`
- **Returned**: `"fallback"`
- **Top Candidates**: `cms` (0.394), `need-from-me` (0.219), `call` (0.179)
- **Context**: cms kb entry

### [24] Category: `natural`
- **Question**: "Could you give me a summary of your different website packages?"
- **Expected**: `[plans-overview]`
- **Returned**: `"fallback"`
- **Top Candidates**: `plans-overview` (0.317), `portfolio-site` (0.294), `solo` (0.292)
- **Context**: plans-overview kb entry

### [25] Category: `natural`
- **Question**: "How many pages and features come with the Standard tier?"
- **Expected**: `[standard]`
- **Returned**: `"fallback"`
- **Top Candidates**: `standard` (0.278), `timeline` (0.255), `revisions` (0.255)
- **Context**: standard kb entry

### [26] Category: `natural`
- **Question**: "What advanced capabilities are included in your Growth package?"
- **Expected**: `[growth]`
- **Returned**: `"fallback"`
- **Top Candidates**: `included` (0.336), `care` (0.33), `growth` (0.323)
- **Context**: growth kb entry

### [27] Category: `natural`
- **Question**: "I am not sure which package fits my business needs best, can you guide me?"
- **Expected**: `[which-plan]`
- **Returned**: `"fallback"`
- **Top Candidates**: `which-plan` (0.421), `seo` (0.171), `custom-code` (0.163)
- **Context**: which-plan kb entry

### [28] Category: `natural`
- **Question**: "How do I decide between Starter, Standard, and Growth?"
- **Expected**: `[which-plan]`
- **Returned**: `"fallback"`
- **Top Candidates**: `starter` (0.323), `standard` (0.323), `growth` (0.323)
- **Context**: which-plan kb entry

### [29] Category: `natural`
- **Question**: "What is your pricing model for new client projects?"
- **Expected**: `[pricing]`
- **Returned**: `"fallback"`
- **Top Candidates**: `pricing` (0.323), `projects` (0.323), `for-whom` (0.278)
- **Context**: pricing kb entry

### [30] Category: `natural`
- **Question**: "Are there any unexpected surprise costs or recurring hidden fees?"
- **Expected**: `[hidden-fees]`
- **Returned**: `"fallback"`
- **Top Candidates**: `hidden-fees` (0.396), `pricing` (0.22), `greeting` (0.198)
- **Context**: hidden-fees kb entry

### [31] Category: `natural`
- **Question**: "Will I be hit with extra charges after the initial quote?"
- **Expected**: `[hidden-fees]`
- **Returned**: `"fallback"`
- **Top Candidates**: `hidden-fees` (0.392), `post-launch` (0.33), `pricing` (0.244)
- **Context**: hidden-fees kb entry

### [32] Category: `natural`
- **Question**: "How does a typical project workflow proceed from kickoff to delivery?"
- **Expected**: `[process]`
- **Returned**: `"fallback"`
- **Top Candidates**: `process` (0.244), `start` (0.227), `timeline` (0.217)
- **Context**: process kb entry

### [33] Category: `natural`
- **Question**: "How much time does it generally take from start to launch?"
- **Expected**: `[timeline]`
- **Returned**: `"fallback"`
- **Top Candidates**: `pricing` (0.255), `start` (0.251), `timeline` (0.246)
- **Context**: timeline kb entry

### [34] Category: `natural`
- **Question**: "How do we begin working together on my new site?"
- **Expected**: `[start]`
- **Returned**: `"process"`
- **Top Candidates**: `process` (0.491), `start` (0.32), `redesign` (0.288)
- **Context**: start kb entry

### [35] Category: `natural`
- **Question**: "Do I have to prepare all copy, logos, and photos beforehand?"
- **Expected**: `[need-from-me]`
- **Returned**: `"fallback"`
- **Top Candidates**: `need-from-me` (0.369), `client-work` (0.226), `plans-overview` (0.225)
- **Context**: need-from-me kb entry

### [36] Category: `natural`
- **Question**: "Will you show me Figma mockups before building the site?"
- **Expected**: `[design-approval]`
- **Returned**: `"fallback"`
- **Top Candidates**: `design-approval` (0.356), `data-use` (0.238), `projects` (0.236)
- **Context**: design-approval kb entry

### [37] Category: `natural`
- **Question**: "What standard features come included in all your website deliverables?"
- **Expected**: `[included]`
- **Returned**: `"fallback"`
- **Top Candidates**: `included` (0.256), `thanks-bye` (0.252), `standard` (0.245)
- **Context**: included kb entry

### [38] Category: `natural`
- **Question**: "What is your revision policy if I need tweaks during development?"
- **Expected**: `[revisions]`
- **Returned**: `"fallback"`
- **Top Candidates**: `post-launch` (0.372), `which-plan` (0.263), `need-from-me` (0.234)
- **Context**: revisions kb entry

### [39] Category: `natural`
- **Question**: "Do I own the domain, code repository, and design files upon completion?"
- **Expected**: `[ownership]`
- **Returned**: `"fallback"`
- **Top Candidates**: `ownership` (0.4), `tech-stack` (0.223), `design-approval` (0.222)
- **Context**: ownership kb entry

### [40] Category: `natural`
- **Question**: "What kind of support is offered right after the site goes live?"
- **Expected**: `[post-launch]`
- **Returned**: `"fallback"`
- **Top Candidates**: `post-launch` (0.357), `cms` (0.203), `starter` (0.196)
- **Context**: post-launch kb entry

### [41] Category: `natural`
- **Question**: "If a bug occurs in the first month after launch, do you fix it?"
- **Expected**: `[post-launch]`
- **Returned**: `"fallback"`
- **Top Candidates**: `post-launch` (0.388), `mobile` (0.194), `design-approval` (0.185)
- **Context**: post-launch kb entry

### [42] Category: `natural`
- **Question**: "What happens if I am completely unsatisfied with the initial design drafts?"
- **Expected**: `[unhappy]`
- **Returned**: `"fallback"`
- **Top Candidates**: `design-approval` (0.213), `privacy` (0.203), `process` (0.194)
- **Context**: unhappy kb entry

### [43] Category: `natural`
- **Question**: "Do you offer any refund or guarantee if the work doesn't match expectations?"
- **Expected**: `[unhappy]`
- **Returned**: `"fallback"`
- **Top Candidates**: `what-he-does` (0.213), `process` (0.213), `start` (0.204)
- **Context**: unhappy kb entry

### [44] Category: `natural`
- **Question**: "Are there any special promotions or discounts available for early clients?"
- **Expected**: `[discount]`
- **Returned**: `"fallback"`
- **Top Candidates**: `location` (0.227), `discount` (0.219), `for-whom` (0.205)
- **Context**: discount kb entry

### [45] Category: `natural`
- **Question**: "Can you deploy my website to Netlify, Vercel, or Cloudflare?"
- **Expected**: `[hosting]`
- **Returned**: `"fallback"`
- **Top Candidates**: `redesign` (0.288), `portfolio-site` (0.286), `custom-code` (0.276)
- **Context**: hosting kb entry

### [46] Category: `natural`
- **Question**: "Do we sign a formal freelance agreement or contract before kick-off?"
- **Expected**: `[contract]`
- **Returned**: `"fallback"`
- **Top Candidates**: `contract` (0.359), `design-approval` (0.179), `contact` (0.174)
- **Context**: contract kb entry

### [47] Category: `natural`
- **Question**: "Is there a written statement of work protecting both parties?"
- **Expected**: `[contract]`
- **Returned**: `"fallback"`
- **Top Candidates**: `projects` (0.244), `start` (0.242), `process` (0.241)
- **Context**: contract kb entry

### [48] Category: `natural`
- **Question**: "Could you describe what the Meridian design system project is?"
- **Expected**: `[meridian]`
- **Returned**: `"fallback"`
- **Top Candidates**: `meridian` (0.32), `unhappy` (0.288), `design-approval` (0.284)
- **Context**: meridian kb entry

### [49] Category: `natural`
- **Question**: "What was your role in creating the Meridian project showcased here?"
- **Expected**: `[meridian]`
- **Returned**: `"fallback"`
- **Top Candidates**: `meridian` (0.276), `unhappy` (0.253), `start` (0.245)
- **Context**: meridian kb entry

### [50] Category: `natural`
- **Question**: "What is the Axiom project featured in your case studies?"
- **Expected**: `[axiom]`
- **Returned**: `"client-work"`
- **Top Candidates**: `client-work` (0.552), `axiom` (0.32), `unhappy` (0.288)
- **Context**: axiom kb entry

### [51] Category: `natural`
- **Question**: "Tell me more about the architecture and design of Axiom."
- **Expected**: `[axiom]`
- **Returned**: `"fallback"`
- **Top Candidates**: `axiom` (0.422), `design-approval` (0.326), `redesign` (0.302)
- **Context**: axiom kb entry

### [52] Category: `natural`
- **Question**: "How did you build this exact portfolio website that I am browsing?"
- **Expected**: `[portfolio-site]`
- **Returned**: `"fallback"`
- **Top Candidates**: `portfolio-site` (0.392), `what-he-does` (0.373), `who` (0.33)
- **Context**: portfolio-site kb entry

### [53] Category: `natural`
- **Question**: "Have you worked with external clients or are these only personal projects?"
- **Expected**: `[client-work]`
- **Returned**: `"fallback"`
- **Top Candidates**: `client-work` (0.398), `projects` (0.217), `for-whom` (0.212)
- **Context**: client-work kb entry

### [54] Category: `natural`
- **Question**: "Are you specialized in React, Vite, Tailwind, and Node.js?"
- **Expected**: `[tech-stack]`
- **Returned**: `"fallback"`
- **Top Candidates**: `tech-stack` (0.278), `contact` (0.248), `portfolio-site` (0.216)
- **Context**: tech-stack kb entry

### [55] Category: `natural`
- **Question**: "How do you handle visitor privacy on this website?"
- **Expected**: `[privacy]`
- **Returned**: `"fallback"`
- **Top Candidates**: `privacy` (0.323), `hosting` (0.301), `help` (0.288)
- **Context**: privacy kb entry

### [56] Category: `natural`
- **Question**: "Do you use third-party cookies or intrusive trackers on this site?"
- **Expected**: `[tracking]`
- **Returned**: `"fallback"`
- **Top Candidates**: `tracking` (0.408), `cms` (0.357), `custom-code` (0.214)
- **Context**: tracking kb entry

### [57] Category: `natural`
- **Question**: "Does your site track visitors across the web?"
- **Expected**: `[tracking]`
- **Returned**: `"fallback"`
- **Top Candidates**: `tracking` (0.331), `portfolio-site` (0.292), `cms` (0.288)
- **Context**: tracking kb entry

### [58] Category: `natural`
- **Question**: "How is the contact information I provide utilized by Vasanth?"
- **Expected**: `[data-use]`
- **Returned**: `"fallback"`
- **Top Candidates**: `contact` (0.344), `who` (0.317), `what-he-does` (0.313)
- **Context**: data-use kb entry

### [59] Category: `natural`
- **Question**: "Do you sell or share client email addresses with advertisers?"
- **Expected**: `[data-use]`
- **Returned**: `"fallback"`
- **Top Candidates**: `data-use` (0.446), `email` (0.439), `what-he-does` (0.299)
- **Context**: data-use kb entry

### [60] Category: `natural`
- **Question**: "Can I request the deletion or removal of my personal information?"
- **Expected**: `[data-rights]`
- **Returned**: `"fallback"`
- **Top Candidates**: `revisions` (0.297), `data-rights` (0.286), `privacy` (0.282)
- **Context**: data-rights kb entry

### [61] Category: `natural`
- **Question**: "What privacy rights do I have regarding my submitted contact data?"
- **Expected**: `[data-rights]`
- **Returned**: `"fallback"`
- **Top Candidates**: `data-rights` (0.443), `privacy` (0.435), `data-use` (0.272)
- **Context**: data-rights kb entry

### [62] Category: `natural`
- **Question**: "Does this chat send my typed queries to a third-party server?"
- **Expected**: `[chat-privacy]`
- **Returned**: `"fallback"`
- **Top Candidates**: `cms` (0.357), `chat-privacy` (0.356), `hosting` (0.217)
- **Context**: chat-privacy kb entry

### [63] Category: `natural`
- **Question**: "Where can I find your contact form to drop a note?"
- **Expected**: `[contact]`
- **Returned**: `"fallback"`
- **Top Candidates**: `contract` (0.407), `contact` (0.297), `location` (0.25)
- **Context**: contact kb entry

### [64] Category: `natural`
- **Question**: "What email can I reach you at for project inquiries?"
- **Expected**: `[email]`
- **Returned**: `"fallback"`
- **Top Candidates**: `email` (0.401), `contact` (0.393), `tech-stack` (0.321)
- **Context**: email kb entry

### [65] Category: `natural`
- **Question**: "Can I reach you over telephone or WhatsApp?"
- **Expected**: `[phone]`
- **Returned**: `"fallback"`
- **Top Candidates**: `contact` (0.4), `phone` (0.385), `tech-stack` (0.327)
- **Context**: phone kb entry

### [66] Category: `natural`
- **Question**: "Can we arrange a 15-minute introductory video discovery call?"
- **Expected**: `[call]`
- **Returned**: `"fallback"`
- **Top Candidates**: `call` (0.437), `phone` (0.255), `lead-gen` (0.217)
- **Context**: call kb entry

### [67] Category: `natural`
- **Question**: "Do you do Zoom or Google Meet discovery calls before taking on a project?"
- **Expected**: `[call]`
- **Returned**: `"fallback"`
- **Top Candidates**: `call` (0.359), `seo` (0.203), `start` (0.203)
- **Context**: call kb entry

### [68] Category: `natural`
- **Question**: "Could you explain how ongoing maintenance differs from one-time development?"
- **Expected**: `[care, what-he-does]`
- **Returned**: `"fallback"`
- **Top Candidates**: `location` (0.365), `need-from-me` (0.203), `care` (0.197)
- **Context**: care and services distinction

### [69] Category: `natural`
- **Question**: "If I already have a Figma design, can you just do the frontend coding?"
- **Expected**: `[what-he-does, custom-code]`
- **Returned**: `"fallback"`
- **Top Candidates**: `design-approval` (0.22), `client-work` (0.212), `plans-overview` (0.211)
- **Context**: development from existing design

### [70] Category: `natural`
- **Question**: "How do you ensure the site stays fast and doesn't get bloated over time?"
- **Expected**: `[tech-stack, included]`
- **Returned**: `"fallback"`
- **Top Candidates**: `timeline` (0.204), `included` (0.202), `contact` (0.202)
- **Context**: performance and speed questions

### [71] Category: `natural`
- **Question**: "Are your contact forms connected to email or a database?"
- **Expected**: `[contact, data-collected]`
- **Returned**: `"fallback"`
- **Top Candidates**: `contact` (0.331), `email` (0.328), `lead-gen` (0.276)
- **Context**: form submissions infrastructure

### [72] Category: `keyword`
- **Question**: "case studies"
- **Expected**: `[projects]`
- **Returned**: `"client-work"`
- **Top Candidates**: `client-work` (1), `projects` (0.5), `care` (0.425)
- **Context**: projects keyword

### [73] Category: `keyword`
- **Question**: "google"
- **Expected**: `[seo]`
- **Returned**: `"landing"`
- **Top Candidates**: `landing` (0.667), `seo` (0.667), `tracking` (0.667)
- **Context**: seo keyword

### [74] Category: `keyword`
- **Question**: "online shop"
- **Expected**: `[online-store]`
- **Returned**: `"booking"`
- **Top Candidates**: `booking` (0.5), `online-store` (0.5), `unhappy` (0.42)
- **Context**: online store keyword

### [75] Category: `typos`
- **Question**: "timelne for 5 pages"
- **Expected**: `[timeline]`
- **Returned**: `"standard"`
- **Top Candidates**: `standard` (0.656), `landing` (0.396), `timeline` (0.395)
- **Context**: typo in timeline

### [76] Category: `typos`
- **Question**: "do u build boking forms"
- **Expected**: `[booking]`
- **Returned**: `"fallback"`
- **Top Candidates**: `what-he-does` (0.404), `for-whom` (0.339), `timeline` (0.328)
- **Context**: typo in booking

### [77] Category: `typos`
- **Question**: "boking integration"
- **Expected**: `[booking]`
- **Returned**: `"cms"`
- **Top Candidates**: `cms` (0.533), `booking` (0.425), `greeting` (0)
- **Context**: typo in booking

### [78] Category: `typos`
- **Question**: "can u do onlinestore"
- **Expected**: `[online-store]`
- **Returned**: `"fallback"`
- **Top Candidates**: `greeting` (0), `thanks-bye` (0), `help` (0)
- **Context**: missing space in online store

### [79] Category: `typos`
- **Question**: "do u provide hsting"
- **Expected**: `[hosting]`
- **Returned**: `"fallback"`
- **Top Candidates**: `hosting` (0.42), `need-from-me` (0.4), `greeting` (0)
- **Context**: typo in hosting

### [80] Category: `typos`
- **Question**: "if somthing breaks"
- **Expected**: `[post-launch]`
- **Returned**: `"fallback"`
- **Top Candidates**: `unhappy` (0.325), `which-plan` (0.32), `post-launch` (0.282)
- **Context**: typo in something

### [81] Category: `slang`
- **Question**: "hw much for a 5 pg site pls"
- **Expected**: `[pricing]`
- **Returned**: `"fallback"`
- **Top Candidates**: `pricing` (0.28), `starter` (0.247), `growth` (0.247)
- **Context**: slang query for pricing

### [82] Category: `slang`
- **Question**: "abt your past projects pls"
- **Expected**: `[projects]`
- **Returned**: `"fallback"`
- **Top Candidates**: `projects` (0.396), `timeline` (0.333), `client-work` (0.331)
- **Context**: slang projects

### [83] Category: `slang`
- **Question**: "cn u redesign my current pg"
- **Expected**: `[redesign]`
- **Returned**: `"fallback"`
- **Top Candidates**: `redesign` (0.331), `design-approval` (0.227), `greeting` (0)
- **Context**: slang redesign

### [84] Category: `slang`
- **Question**: "wat abt hosting do u pay it"
- **Expected**: `[hosting]`
- **Returned**: `"fallback"`
- **Top Candidates**: `hidden-fees` (0.349), `payment` (0.336), `hosting` (0.328)
- **Context**: slang hosting

### [85] Category: `slang`
- **Question**: "do u make ai bots for sites"
- **Expected**: `[ai-chatbots]`
- **Returned**: `"fallback"`
- **Top Candidates**: `ai-chatbots` (0.328), `about-bot` (0.323), `starter` (0.239)
- **Context**: slang chatbots

### [86] Category: `slang`
- **Question**: "hw do i pay u upfront or later"
- **Expected**: `[payment]`
- **Returned**: `"fallback"`
- **Top Candidates**: `payment` (0.349), `hidden-fees` (0.255), `post-launch` (0.227)
- **Context**: slang payment

### [87] Category: `slang`
- **Question**: "cn i get a discount pls"
- **Expected**: `[discount]`
- **Returned**: `"fallback"`
- **Top Candidates**: `included` (0.4), `discount` (0.392), `pricing` (0.341)
- **Context**: slang discount

### [88] Category: `slang`
- **Question**: "cn we jump on a call abt this"
- **Expected**: `[call]`
- **Returned**: `"fallback"`
- **Top Candidates**: `phone` (0.323), `call` (0.292), `about-bot` (0.278)
- **Context**: slang call

### [89] Category: `slang`
- **Question**: "drop ur email pls"
- **Expected**: `[email]`
- **Returned**: `"fallback"`
- **Top Candidates**: `email` (0.4), `lead-gen` (0.333), `data-use` (0.328)
- **Context**: slang email

### [90] Category: `slang`
- **Question**: "will my biz site look dope on mobile"
- **Expected**: `[mobile]`
- **Returned**: `"fallback"`
- **Top Candidates**: `mobile` (0.282), `redesign` (0.258), `starter` (0.247)
- **Context**: slang mobile

### [91] Category: `compound`
- **Question**: "Do you offer monthly maintenance and what happens if something breaks?"
- **Expected**: `[care, post-launch]`
- **Returned**: `"fallback"`
- **Top Candidates**: `care` (0.435), `what-he-does` (0.275), `discount` (0.244)
- **Context**: care and post-launch

### [92] Category: `compound`
- **Question**: "Why should I hire a solo freelancer and do you write custom code?"
- **Expected**: `[solo, custom-code]`
- **Returned**: `"fallback"`
- **Top Candidates**: `solo` (0.439), `custom-code` (0.43), `tech-stack` (0.259)
- **Context**: solo and custom code

### [93] Category: `business`
- **Question**: "I need a modern website for my fitness gym"
- **Expected**: `[which-plan, start, for-whom]`
- **Returned**: `"fallback"`
- **Top Candidates**: `which-plan` (0.331), `start` (0.301), `pricing` (0.299)
- **Context**: business inquiry: gym

### [94] Category: `business`
- **Question**: "Can you build a clean website for my law firm?"
- **Expected**: `[which-plan, start, for-whom]`
- **Returned**: `"fallback"`
- **Top Candidates**: `what-he-does` (0.344), `ai-chatbots` (0.311), `for-whom` (0.297)
- **Context**: business inquiry: law firm

### [95] Category: `business`
- **Question**: "I am a private therapist and need a simple site with appointment booking"
- **Expected**: `[booking, which-plan, start]`
- **Returned**: `"fallback"`
- **Top Candidates**: `booking` (0.39), `which-plan` (0.223), `need-from-me` (0.219)
- **Context**: business inquiry: therapist booking

### [96] Category: `business`
- **Question**: "Website for a boutique real estate agency with property listings"
- **Expected**: `[which-plan, start, for-whom]`
- **Returned**: `"meridian"`
- **Top Candidates**: `meridian` (0.591), `about-bot` (0.242), `pricing` (0.237)
- **Context**: business inquiry: real estate

### [97] Category: `business`
- **Question**: "Can you create a website for my photography business?"
- **Expected**: `[which-plan, start, for-whom]`
- **Returned**: `"standard"`
- **Top Candidates**: `standard` (0.64), `pricing` (0.344), `redesign` (0.333)
- **Context**: business inquiry: photography

### [98] Category: `business`
- **Question**: "I own a car detailing shop and need customers to book online"
- **Expected**: `[booking, which-plan, start]`
- **Returned**: `"fallback"`
- **Top Candidates**: `which-plan` (0.225), `need-from-me` (0.213), `call` (0.205)
- **Context**: business inquiry: car detailing booking

### [99] Category: `business`
- **Question**: "Can you build a website for my pet grooming service?"
- **Expected**: `[which-plan, start, for-whom]`
- **Returned**: `"fallback"`
- **Top Candidates**: `what-he-does` (0.344), `ai-chatbots` (0.311), `for-whom` (0.297)
- **Context**: business inquiry: pet grooming

### [100] Category: `honesty_traps`
- **Question**: "Is a basic website exactly 10000 rupees?"
- **Expected**: `[pricing]`
- **Returned**: `"starter"`
- **Top Candidates**: `starter` (0.563), `start` (0.292), `pricing` (0.29)
- **Context**: kb says pricing scoped individually; must hit pricing not confirm number

### [101] Category: `honesty_traps`
- **Question**: "Can you guarantee my website will rank #1 on Google in 2 weeks?"
- **Expected**: `[seo]`
- **Returned**: `"fallback"`
- **Top Candidates**: `seo` (0.398), `redesign` (0.204), `data-use` (0.203)
- **Context**: kb says clean SEO foundation but no impossible guarantees; must hit seo

### [102] Category: `honesty_traps`
- **Question**: "Are you using AI to automatically generate the code?"
- **Expected**: `[custom-code, tech-stack]`
- **Returned**: `"fallback"`
- **Top Candidates**: `about-bot` (0.349), `tech-stack` (0.328), `ai-chatbots` (0.323)
- **Context**: kb explains custom code / hand-crafted build; must hit custom-code

### [103] Category: `honesty_traps`
- **Question**: "Are you Vasanth himself chatting with me right now?"
- **Expected**: `[about-bot]`
- **Returned**: `"fallback"`
- **Top Candidates**: `who` (0.331), `what-he-does` (0.315), `help` (0.283)
- **Context**: must clarify bot identity and hit about-bot

### [104] Category: `honesty_traps`
- **Question**: "Can you finish a complex custom app by tomorrow morning?"
- **Expected**: `[timeline]`
- **Returned**: `"fallback"`
- **Top Candidates**: `greeting` (0.244), `custom-code` (0.244), `booking` (0.244)
- **Context**: kb specifies timelines start at 3-5 days for landing pages; must hit timeline

### [105] Category: `honesty_traps`
- **Question**: "Is website hosting 100% free forever with no third party accounts?"
- **Expected**: `[hosting]`
- **Returned**: `"fallback"`
- **Top Candidates**: `cms` (0.331), `hosting` (0.198), `custom-code` (0.18)
- **Context**: kb explains hosting tiers; must hit hosting

