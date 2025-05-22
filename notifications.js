// Function to schedule notifications
function scheduleMedicationNotifications() {
    if (!('Notification' in window)) {
        console.log('This browser does not support notifications');
        return;
    }
    
    // Check if notifications are allowed
    if (Notification.permission === 'granted') {
        medicines.forEach(med => {
            const now = new Date();
            const medTime = calculateNotificationTime(med.time);
            
            // Only schedule if the medicine is pending and time is in the future
            if (med.status === 'pending' && medTime > now) {
                const timeDiff = medTime - now;
                
                setTimeout(() => {
                    showNotification(med);
                }, timeDiff);
            }
        });
    }
}

// Calculate notification time based on medicine time
function calculateNotificationTime(timeOfDay) {
    const now = new Date();
    const notificationTime = new Date();
    
    switch (timeOfDay) {
        case 'morning':
            notificationTime.setHours(8, 0, 0, 0);
            break;
        case 'afternoon':
            notificationTime.setHours(12, 0, 0, 0);
            break;
        case 'evening':
            notificationTime.setHours(17, 0, 0, 0);
            break;
        case 'night':
            notificationTime.setHours(21, 0, 0, 0);
            break;
        default:
            return now;
    }
    
    // If the time has already passed today, schedule for tomorrow
    if (notificationTime < now) {
        notificationTime.setDate(notificationTime.getDate() + 1);
    }
    
    return notificationTime;
}

// Show notification
function showNotification(medicine) {
    const notification = new Notification('PillPal Reminder 💊', {
        body: `It's time to take your ${medicine.name} (${medicine.dosage})!`,
        icon: 'images/pill-icon.png'
    });
    
    notification.onclick = () => {
        window.focus();
        notification.close();
    };
}

// Initialize notifications when a new medicine is added
function initMedicineNotifications(medicine) {
    if (Notification.permission === 'granted') {
        const notificationTime = calculateNotificationTime(medicine.time);
        const timeDiff = notificationTime - new Date();
        
        if (timeDiff > 0) {
            setTimeout(() => {
                showNotification(medicine);
            }, timeDiff);
        }
    }
}

// Request notification permission if not already set
if ('Notification' in window && Notification.permission !== 'denied') {
    Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
            console.log('Notification permission granted.');
            scheduleMedicationNotifications();
        }
    });
}
