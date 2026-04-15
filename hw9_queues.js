// hw9_queues.js
// CIST 0265 - Week 9 Homework: Queues

// ─── Provided Queue Class (do not modify) ──────────────
class Queue {
  #items = [];
  enqueue(item) { this.#items.push(item); }
  dequeue()     { return this.#items.shift(); }
  front()       { return this.#items[0]; }
  isEmpty()     { return this.#items.length === 0; }
  get size()    { return this.#items.length; }
  clear()       { this.#items = []; }
  toString()    { return this.#items.join(" <- "); }
}

// ════════════════════════════════════════════
// EXERCISE 1 — Print Queue Simulator  (15 pts)
// ════════════════════════════════════════════
const printJobs = [
  { id: 1, name: "Resume.pdf",       pages: 2  },
  { id: 2, name: "CoverLetter.pdf",  pages: 1  },
  { id: 3, name: "Portfolio.pdf",    pages: 18 },
  { id: 4, name: "References.pdf",   pages: 1  },
];

function loadPrintQueue(jobs) {
  const queue = new Queue();
  // loop through each job in the array and add it to the back of the queue.
  // enqueue() - adds to the end so the order matches og array
  for (const job of jobs) {
    queue.enqueue(job);
  }

  return queue;
}

function processPrintQueue(queue) {
  const printed = [];
  
  // keep going until there is no jobs left in the queue
  while (!queue.isEmpty()) {
    //dequeue () - removes and returns the job at the front (oldest job first)
    const job = queue.dequeue();
    // save just the filename string, not the whole objects
    printed.push(job.name);
  }

  return printed;
}

function totalPages(jobs) {
    // reduse () walks through every job and accumulates a running total.
    // 'total' starts at 0, and we add each job's page count to it.
    return jobs.reduce((total, job) => total + job.pages, 0);
}

// ════════════════════════════════════════════
// EXERCISE 2 — Hot Potato Simulation  (20 pts)
// ════════════════════════════════════════════
function hotPotato(players, numPasses) {
  const queue = new Queue();
  // YOUR CODE HERE
}

function hotPotatoLog(players, numPasses) {
  const queue = new Queue();
  const eliminated = [];
  // YOUR CODE HERE
  // return { winner: ..., eliminated };
}

// ════════════════════════════════════════════
// EXERCISE 3 — BONUS: Josephus Problem  (15 pts)
// ════════════════════════════════════════════
function josephus(n, k) {
  const queue = new Queue();
  // YOUR CODE HERE
}

module.exports = { loadPrintQueue, processPrintQueue, totalPages, hotPotato, hotPotatoLog, josephus };