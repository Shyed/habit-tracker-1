// Get form element from HTML
const habitForm = document.getElementById('habitForm');

// Get text input element
const habitInput = document.getElementById('habitInput');

// Get habit list container
const habitList = document.getElementById('habitList');

// Backend API route
const API_URL = '/api/habits';

/* ==== CREATE NEW HABIT ==== */

// Listen for form submission
habitForm.addEventListener('submit', async (e) => {

  // Prevent page refresh 
  e.preventDefault();

  // Send POST request to backend
  const res = await fetch(API_URL, {
    // HTTP method
    method: 'POST',
    // Tell backend were sending JSON
    headers: { 'Content-Type': 'application/json' },
    // Convert JavaScript object into JSON string
    body: JSON.stringify({ name: habitInput.value }),
  });
  // Convert backend response into JavaScript object
  const habit = await res.json();
  //Add new habit into UI
  addHabitToList(habit);
  // Clear input field
  habitInput.value = '';
});

/* ==== LOAD EXISTING HABIT ==== */
async function loadHabits() {
  // Fetch all habits from backend
  const res = await fetch(API_URL);
  // Convert JSON response into JavaScript array
  con habits = await res.json();
  // Loop through habits, Add each one into UI
  habits.forEach(addHabitToList);
}

/* ==== MARK HABIT COMPLETE ==== */
async function markCompleted(id, btn) {
  // Sent PUT request to backend
  const res = await fetch(`${API_URL}/${id}/complete`, { method: 'PUT' });
  // Get updated habit from backend
  const updated = await res.json();
  // Update button text with new completion count
  btn.textContent = `✅ Completed: ${updated.completedDates.length}`;
}

/* ==== ADD HABITS INTO UI ==== */
function addHabitToList(habit) {
  // Create new list item
  const li = document.createElement('li');
  // Create completion button
  const btn = document.createElement('button');
  // Show completion count
  btn.textContent = `✅ Completed: ${habit.completedDates.length}`;
  // When button clicked: mark habit completed
  btn.onclick = () => markCompleted(habit._id, btn);
  // Display habit name
  li.textContent = habit.name + ' ';
  // Add button into list item
  li.appendChild(btn);
  // Add list item into page
  habitList.appendChild(li);
}

/* ==== INITIAL PAGE LOAD ====*/
// Load all habits when page first opens
loadHabits();
