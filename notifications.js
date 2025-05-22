document.addEventListener('DOMContentLoaded', function() {
    const notifyBtn = document.getElementById('enable-notifications');
    
    if (notifyBtn) {
        notifyBtn.addEventListener('click', function() {
            if ('Notification' in window) {
                Notification.requestPermission().then(permission => {
                    if (permission === 'granted') {
                        alert('Notifications enabled! You\'ll get reminders for your medicines.');
                    }
                });
            }
        });
    }
});
