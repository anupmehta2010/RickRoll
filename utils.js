// Utility: Shuffle array (Fisher-Yates)
function shuffle(array) {
    let arr = array.slice();
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// Non-repeating randomizer factory
function createNonRepeatingRandomizer(items) {
    let pool = shuffle(items);
    let index = 0;
    return function next() {
        if (index >= pool.length) {
            pool = shuffle(items);
            index = 0;
        }
        return pool[index++];
    };
}