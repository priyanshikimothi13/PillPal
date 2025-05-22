document.addEventListener('DOMContentLoaded', function() {
    // Medicine Form
    const medForm = document.getElementById('medicine-form');
    if (medForm) {
        medForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const newMed = {
                name: document.getElementById('med-name').value,
                dosage: document.getElementById('med-dosage').value,
                time: document.getElementById('med-time').value,
                duration: document.getElementById('med-duration').value
            };
            
            saveMedicine(newMed);
            medForm.reset();
            alert(`${newMed.name} added successfully!`);
        });
    }

    function saveMedicine(medicine) {
        let medicines = JSON.parse(localStorage.getItem('medicines')) || [];
        medicines.push(medicine);
        localStorage.setItem('medicines', JSON.stringify(medicines));
        updateMedicinesList();
    }

    function updateMedicinesList() {
        const list = document.getElementById('medicines-list');
        const medicines = JSON.parse(localStorage.getItem('medicines')) || [];
        
        list.innerHTML = medicines.map(med => `
            <div class="med-card">
                <h3>${med.name}</h3>
                <p>${med.dosage} at ${med.time}</p>
                <p>For ${med.duration} days</p>
            </div>
        `).join('');
    }

    // Initialize
    updateMedicinesList();
});
