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
    // reduce () walks through every job and accumulates a running total.
    // 'total' starts at 0, and we add each job's page count to it.
    return jobs.reduce((total, job) => total + job.pages, 0);
}

// ════════════════════════════════════════════
// EXERCISE 2 — Hot Potato Simulation  (20 pts)
// ════════════════════════════════════════════
function hotPotato(players, numPasses) {
  const queue = new Queue();
    
  // Load all players into the queue in order. 
  for (const player of players) {
    queue.enqueue(player);
  }

  // keep eliminating players until only one remains 
  while (queue.size > 1) {
    // "pass the potato" numPasses times.
    //Each pass moves the front player to the back - simulating passing around the circle
    for (let i = 0; i < numPasses; i++) {
        queue.enqueue(queue.dequeue());
    }

    // After the passes, whoever is now at the front is holding the potato, they're out 
    queue.dequeue();
  }

  // The last player left in the queue is the winner
  return queue.front();
}

function hotPotatoLog(players, numPasses) {
  const queue = new Queue();
  const eliminated = [];
    //Load all players into the queue in order 
    for (const player of players) {
        queue.enqueue(player);
    }

    //Same loop as hotPotato, but this we record who gets eliminated 
    while (queue.size > 1) {
        // rotate the queue numPasses times to pass the potato around
        for (let i = 0; i < numPasses; i++) {
            queue.enqueue(queue.dequeue());
        }

        //the player at the front is eliminated - remove them and log their name 
        eliminated.push(queue.dequeue());
    }

    //Return both the winner (last one in queue) and the elimation order
    return { winner: queue.front(), eliminated};
}

// ════════════════════════════════════════════
// EXERCISE 3 — BONUS: Josephus Problem  (15 pts)
// ════════════════════════════════════════════
function josephus(n, k) {
  const queue = new Queue();

    // enqueue positions 1 through n to represent the people standing in a circle 
    for (let i = 1; i <=n; i++) {
        queue.enqueue(i);
    }

    // keep eliminating until one person remains 
    while (queue.size > 1) {
        // rotate k-1 times to advance to the k-th person 
        // we only rotate k-1 because the dequeue on the next line counts as the k-th step
        for (let i = 0; i < k - 1; i++) {
            queue.enqueue(queue.dequeue());
        }

        // the person now at the front is the k-th - elimainate  them 
        queue.dequeue();
    }

    // the last remainig position is the survivor 
    return queue.front();
}

module.exports = { loadPrintQueue, processPrintQueue, totalPages, hotPotato, hotPotatoLog, josephus };