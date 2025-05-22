// Sample medicine data
let medicines = [];

// DOM elements
const addMedBtn = document.getElementById('add-med-btn');
const medForm = document.getElementById('med-form');
const medicineForm = document.getElementById('medicine-form');
const scheduleCards = document.querySelector('.schedule-cards');

// Toggle form visibility
if (addMedBtn && medForm) {
    addMedBtn.addEventListener('click', () => {
        if (medForm.style.display === 'none') {
            medForm.style.display = 'block';
            addMedBtn.textContent = 'Cancel';
        } else {
            medForm.style.display = 'none';
            addMedBtn.textContent = '+ Add Medicine';
        }
    });
}

// Form submission
if (medicineForm) {
    medicineForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const newMed = {
            id: Date.now(),
            name: document.getElementById('med-name').value,
            dosage: document.getElementById('med-dosage').value,
            time: document.getElementById('med-time').value,
            duration: parseInt(document.getElementById('med-duration').value),
            notes: document.getElementById('med-notes').value,
            emailReminder: document.getElementById('email-reminder').checked,
            status: 'pending',
            addedDate: new Date()
        };
        
        medicines.push(newMed);
        renderMedicines();
        
        // Reset form
        medicineForm.reset();
        medForm.style.display = 'none';
        addMedBtn.textContent = '+ Add Medicine';
        
        // Show success message
        alert(`${newMed.name} added to your schedule!`);
    });
}

// Render medicines
function renderMedicines() {
    if (!scheduleCards) return;
    
    if (medicines.length === 0) {
        scheduleCards.innerHTML = `
            <div class="empty-state">
                <img src="images/empty-schedule.png" alt="No medicines added yet">
                <p>You haven't added any medicines yet. Click the button above to get started!</p>
            </div>
        `;
        return;
    }
    
    scheduleCards.innerHTML = '';
    
    medicines.forEach(med => {
        const medCard = document.createElement('div');
        medCard.className = 'med-card';
        medCard.innerHTML = `
            <span class="status ${med.status}">${med.status}</span>
            <h3>${med.name}</h3>
            <p class="dosage">${med.dosage}</p>
            <span class="time">${formatTime(med.time)}</span>
            <p>Duration: ${med.duration} days</p>
            ${med.notes ? `<p>Notes: ${med.notes}</p>` : ''}
            <div class="med-actions">
                <button class="taken-btn" data-id="${med.id}">Taken</button>
                <button class="skip-btn" data-id="${med.id}">Skip</button>
            </div>
        `;
        
        scheduleCards.appendChild(medCard);
    });
    
    // Add event listeners to action buttons
    document.querySelectorAll('.taken-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.getAttribute('data-id'));
            updateMedicineStatus(id, 'taken');
        });
    });
    
    document.querySelectorAll('.skip-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.getAttribute('data-id'));
            updateMedicineStatus(id, 'skipped');
        });
    });
}

// Update medicine status
function updateMedicineStatus(id, status) {
    const medIndex = medicines.findIndex(med => med.id === id);
    if (medIndex !== -1) {
        medicines[medIndex].status = status;
        renderMedicines();
    }
}

// Format time for display
function formatTime(time) {
    const timeMap = {
        morning: '🌅 Morning',
        afternoon: '☀️ Afternoon',
        evening: '🌇 Evening',
        night: '🌙 Night'
    };
    return timeMap[time] || time;
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderMedicines();
    
    // Check for notifications permission
    if ('Notification' in window) {
        if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
            Notification.requestPermission();
        }
    }
});
