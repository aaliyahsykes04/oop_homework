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
    //use isPalindrome() to filter the list down to only palindromes
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
    // process the highest-priority task (front of the deque.)
    // if the deque is empty, return null instead of crashing 
    if (this.#deque.isEmpty()) return null;
    return this.#deque.removeFront();
  }

  processLast() {
    // Process the lowest-priority task (rear of the deque).
    // Useful for deferring the least urgent work.
    if (this.#deque.isEmpty()) return null;
    return this.#deque.removeRear();
  }



  processAll() {
    const results = [];

    // Keep pulling from the front until every task has been processed.
    while (!this.#deque.isEmpty()) {
      results.push(this.#deque.removeFront());
    }
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
  for (let i = 0; i < nums.length; i++) {

    // Step 1: Remove indices from the REAR that point to values smaller than
    // the current number — they can never be the max of any future window,
    // so keeping them would be wasteful.
    while (!deque.isEmpty() && nums[deque.peekRear()] < nums[i]) {
      deque.removeRear();
    }

    // Step 2: Add the current index to the rear.
    deque.addRear(i);

    // Step 3: Remove the front index if it has fallen outside the current window.
    // A window of size k starting at index i covers indices [i - k + 1 .. i].
    if (deque.peekFront() < i - k + 1) {
      deque.removeFront();
    }

    // Step 4: Once we've processed at least k elements, the front of the deque
    // always holds the index of the maximum value in the current window.
    if (i >= k - 1) {
      result.push(nums[deque.peekFront()]);
    }
  }

  return result;
}

module.exports = { isPalindrome, longestPalindrome, TaskScheduler, slidingWindowMax };