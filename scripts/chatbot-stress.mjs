// scripts/chatbot-stress.mjs
// QA Stress & Regression Test Runner for Vasanth's Portfolio Chatbot

import fs from 'fs';
import path from 'path';
import { performance } from 'perf_hooks';
import { search, normalize, scoreQueryAgainstPhrase } from '../src/chatbot/search.js';
import { kb } from '../src/chatbot/kb.js';

const isHoldoutMode = process.argv.includes('--holdout');

const regressionPath = path.resolve('tests/chatbot/regression.json');
const stressPath = path.resolve('tests/chatbot/stress.json');

const regressionData = JSON.parse(fs.readFileSync(regressionPath, 'utf-8'));
const stressData = JSON.parse(fs.readFileSync(stressPath, 'utf-8'));

function getTopCandidates(query) {
  const norm = normalize(query);
  if (!norm) return [{ id: 'fallback', score: 0 }];
  const candidates = [];
  for (const entry of kb) {
    let maxScore = 0;
    for (const variant of entry.q) {
      const vNorm = normalize(variant);
      let s = 0;
      if (norm === vNorm) {
        s = 1.0;
      } else {
        s = scoreQueryAgainstPhrase(norm, vNorm);
      }
      if (s > maxScore) maxScore = s;
    }
    candidates.push({ id: entry.id, score: Number(maxScore.toFixed(3)) });
  }
  candidates.sort((a, b) => b.score - a.score);
  return candidates.slice(0, 3);
}

// ─── Select Test Set ─────────────────────────────────────────────────────────
let testCases = [];
let hinglishCases = [];

if (isHoldoutMode) {
  testCases = stressData.filter((item) => item.set === 'holdout');
} else {
  // Default mode: regression + tuning
  const taggedRegression = regressionData.map((item) => ({
    ...item,
    category: 'regression',
    set: 'regression',
    why: 'Fixed 22 core regression suite',
  }));

  const tuningItems = stressData.filter((item) => item.set === 'tuning');
  testCases = [...taggedRegression, ...tuningItems.filter((i) => i.category !== 'hinglish')];
  hinglishCases = stressData.filter((i) => i.category === 'hinglish');
}

console.log('='.repeat(70));
console.log(`CHATBOT QA TEST RUNNER ${isHoldoutMode ? '[--holdout MODE]' : '[DEFAULT: REGRESSION + TUNING]'}`);
console.log('='.repeat(70));
console.log(`Total active test queries: ${testCases.length}`);
if (!isHoldoutMode) {
  console.log(`Hinglish report-only queries: ${hinglishCases.length}`);
}
console.log('');

// ─── Execution ───────────────────────────────────────────────────────────────
const categoryStats = {};
const failures = [];
let totalTimeMs = 0;
let falsePositiveCount = 0;
let passedCount = 0;

for (const test of testCases) {
  const cat = test.category || 'general';
  if (!categoryStats[cat]) {
    categoryStats[cat] = { total: 0, passed: 0, failed: 0, falsePositives: 0 };
  }
  categoryStats[cat].total += 1;

  const t0 = performance.now();
  const res = search(test.q);
  const elapsed = performance.now() - t0;
  totalTimeMs += elapsed;

  const returnedId = res ? res.id : 'fallback';
  const expectedList = Array.isArray(test.expect) ? test.expect : [test.expect];
  const isPass = expectedList.includes(returnedId);

  // False positive check:
  // Expected fallback but returned an ID, OR returned a wrong ID
  const isFalsePositive = (!isPass && expectedList.includes('fallback') && returnedId !== 'fallback') ||
                          (!isPass && !expectedList.includes('fallback') && returnedId !== 'fallback');

  if (isPass) {
    categoryStats[cat].passed += 1;
    passedCount += 1;
  } else {
    categoryStats[cat].failed += 1;
    if (isFalsePositive) {
      categoryStats[cat].falsePositives += 1;
      falsePositiveCount += 1;
    }

    const topCandidates = getTopCandidates(test.q);
    failures.push({
      q: test.q,
      category: cat,
      expected: expectedList,
      returnedId,
      topCandidates,
      why: test.why || '',
    });
  }
}

const avgMs = testCases.length > 0 ? (totalTimeMs / testCases.length).toFixed(3) : 0;
const overallPassRate = testCases.length > 0 ? ((passedCount / testCases.length) * 100).toFixed(1) : 0;

// ─── Print Category Breakdown ───────────────────────────────────────────────
console.log('CATEGORY BREAKDOWN:');
console.log('-'.repeat(70));
console.log(
  'Category'.padEnd(18) +
  'Total'.padStart(8) +
  'Passed'.padStart(8) +
  'Failed'.padStart(8) +
  'Pass Rate'.padStart(12) +
  'False Pos'.padStart(12)
);
console.log('-'.repeat(70));

for (const [cat, stat] of Object.entries(categoryStats)) {
  const rate = stat.total > 0 ? ((stat.passed / stat.total) * 100).toFixed(1) + '%' : '0%';
  console.log(
    cat.padEnd(18) +
    String(stat.total).padStart(8) +
    String(stat.passed).padStart(8) +
    String(stat.failed).padStart(8) +
    rate.padStart(12) +
    String(stat.falsePositives).padStart(12)
  );
}
console.log('-'.repeat(70));
console.log(
  'OVERALL'.padEnd(18) +
  String(testCases.length).padStart(8) +
  String(passedCount).padStart(8) +
  String(testCases.length - passedCount).padStart(8) +
  (overallPassRate + '%').padStart(12) +
  String(falsePositiveCount).padStart(12)
);
console.log(`Average Latency: ${avgMs} ms / query\n`);

// ─── Print Failures (Only in Default Mode, suppressed in --holdout) ───────────
if (!isHoldoutMode) {
  if (failures.length > 0) {
    console.log('='.repeat(70));
    console.log(`FAILURES (${failures.length} total):`);
    console.log('='.repeat(70));
    failures.forEach((f, idx) => {
      console.log(`\n[${idx + 1}] Category: [${f.category}]`);
      console.log(`  Question   : "${f.q.length > 80 ? f.q.slice(0, 77) + '...' : f.q}"`);
      console.log(`  Expected   : [${f.expected.join(', ')}]`);
      console.log(`  Returned   : "${f.returnedId}"`);
      console.log(
        `  Candidates : ` +
        f.topCandidates.map((c) => `${c.id} (${c.score})`).join(', ')
      );
    });
    console.log('');
  } else {
    console.log('All tests passed with 100% accuracy!');
  }

  // ─── Report-Only: Hinglish Evaluation ──────────────────────────────────────
  if (hinglishCases.length > 0) {
    console.log('='.repeat(70));
    console.log('REPORT-ONLY: HINGLISH & REGIONAL EVALUATION:');
    console.log('='.repeat(70));
    let hinglishMatched = 0;
    hinglishCases.forEach((item, idx) => {
      const res = search(item.q);
      const retId = res ? res.id : 'fallback';
      const isExpected = item.expect.includes(retId);
      if (isExpected) hinglishMatched++;
      const topC = getTopCandidates(item.q);
      console.log(`[${idx + 1}] "${item.q}"`);
      console.log(`    Expected: [${item.expect.join(', ')}] | Returned: "${retId}" (${isExpected ? 'MATCH' : 'MISMATCH'})`);
      console.log(`    Top Candidates: ` + topC.map((c) => `${c.id} (${c.score})`).join(', '));
    });
    console.log(`\nHinglish Raw Match Rate: ${hinglishMatched}/${hinglishCases.length} (${((hinglishMatched / hinglishCases.length) * 100).toFixed(1)}%)\n`);
  }
} else {
  console.log(`[--holdout mode]: Question text suppressed. Pass rate: ${overallPassRate}%\n`);
}
