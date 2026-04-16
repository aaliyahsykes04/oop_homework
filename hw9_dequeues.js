// hw9_deques.js
// CIST 0265 — Week 9 Homework: Deques

// ─── Provided Deque Class (do not modify) ──────────────
class Deque {
  #items = [];
  addFront(item)  { this.#items.unshift(item); }
  addRear(item)   { this.#items.push(item); }
  removeFront()   { return this.#items.shift(); }
  removeRear()    { return this.#items.pop(); }
  peekFront()     { return this.#items[0]; }
  peekRear()      { return this.#items[this.#items.length - 1]; }
  isEmpty()       { return this.#items.length === 0; }
  get size()      { return this.#items.length; }
  clear()         { this.#items = []; }
  toString()      { return this.#items.join(" | "); }
}

// ════════════════════════════════════════════
// EXERCISE 4 — Palindrome Checker  (15 pts)
// ════════════════════════════════════════════
function isPalindrome(word) {
  const deque = new Deque();

    //load every character of the word into the deque, rear to front 
    //after this loop, peekFront() is the first letter peekRear() is the last
    for (const char of word.toLowerCase()) {
        deque.addRear(char);
    }

    //compare both ends at the same time, working inward 
    // if any pair of characters doesn't match, its not a palindrome 
    while (deque.size > 1) {
        if (deque.removeFront() !== deque.removeRear()) {
            return false;
        }
    }

    // if we made it through w/o a mismatch, its a palindrome 
    return true;
}

function longestPalindrome(words) {
    //use isPalindrome() to filter the list down to only palidromes
    // then find the one w/ the most characters using reduce().
    //if no palindrome return null
    const palindrome = words.filter(isPalindrome);

    if (palindrome.length === 0 ) return null; 

    return palindrome.reduce ((longest, word) => 
        word.length > longest.length ? word : longest);
}

// ════════════════════════════════════════════
// EXERCISE 5 — Task Scheduler  (20 pts)
// ════════════════════════════════════════════
class TaskScheduler {
  #deque = new Deque();

    // Urgent tasks jump to the front of the line so they get processed first.
  addUrgent(task)  { this.#deque.addFront(task); }
    // Routine tasks go to the back — they'll be handled after urgent ones.
  addRoutine(task) { this.#deque.addRear(task); }

  processNext() {
    // process the highest-priority tasks (front of the deque.)
    // if the deque is empty, return null instead of crashing 
    if (this.#deque.isEmpty()) return null;
    return this.#deque.removeFront();
  }

  processLast() {
    // YOUR CODE HERE
  }

  processAll() {
    const results = [];
    // YOUR CODE HERE
    return results;
  }

  peek()     { return this.#deque.peekFront(); }
  get size() { return this.#deque.size; }
  toString() { return this.#deque.toString(); }
}

// ════════════════════════════════════════════
// EXERCISE 6 — BONUS: Sliding Window Maximum  (15 pts)
// ════════════════════════════════════════════
function slidingWindowMax(nums, k) {
  const deque = new Deque();
  const result = [];
  // YOUR CODE HERE
  return result;
}

module.exports = { isPalindrome, longestPalindrome, TaskScheduler, slidingWindowMax };