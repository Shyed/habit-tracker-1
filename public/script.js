const habitForm = document.getElementById('habitForm');
const habitInput = document.getElementById('habitInput');
const habitList = document.getElementById('habitList');

const API_URL = '/api/habits';

habitForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: habitInput.value }),
  });
  const habit = await res.json();
  addHabitToList(habit);
  habitInput.value = '';
});

async function loadHabits() {
  const res = await fetch(API_URL);
  con habits = await res.json();
  habits.forEach(addHabitToList);
}

async function markCompleted(id, btn) {
  const res = await fetch(`${API_URL}/${id}/complete`, { method: 'PUT' });
  const updated = await res.json();
  btn.textContent = `✅ Completed: ${updated.completedDates.length}`;
}

function addHabitToList(habit) {
  const li = document.createElement('li');
  const btn = document.createElement('button');
  btn.textContent = `✅ Completed: ${habit.completedDates.length}`;
  btn.onclick = () => markCompleted(habit._id, btn);
  li.textContent = habit.name + ' ';
  li.appendChild(btn);
  habitList.appendChild(li);
}

loadHabits();
