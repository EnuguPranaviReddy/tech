// Show specific section in dashboard
function showSection(sectionName) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Remove active class from all menu items
    const menuItems = document.querySelectorAll('.sidebar-menu a');
    menuItems.forEach(item => {
        item.classList.remove('active');
    });
    
    // Show selected section
    const selectedSection = document.getElementById(sectionName);
    if (selectedSection) {
        selectedSection.classList.add('active');
    }
    
    // Add active class to clicked menu item
    event.target.classList.add('active');
}

// Save profile
function saveProfile() {
    const name = document.getElementById('profile-name').value;
    const phone = document.getElementById('profile-phone').value;
    const address = document.getElementById('profile-address').value;
    
    if (name && phone && address) {
        // Save to sessionStorage
        sessionStorage.setItem('userProfile', JSON.stringify({
            name: name,
            phone: phone,
            address: address
        }));
        
        showNotification('Profile updated successfully!');
    } else {
        showNotification('Please fill all fields!');
    }
}

// Load profile
function loadProfile() {
    const userProfile = sessionStorage.getItem('userProfile');
    
    if (userProfile) {
        const profile = JSON.parse(userProfile);
        document.getElementById('profile-name').value = profile.name || '';
        document.getElementById('profile-phone').value = profile.phone || '';
        document.getElementById('profile-address').value = profile.address || '';
    }
    
    // Set email (read-only)
    const userEmail = sessionStorage.getItem('userEmail');
    document.getElementById('profile-email').value = userEmail || '';
}

// Change password
function changePassword() {
    const newPassword = prompt('Enter new password:');
    
    if (newPassword && newPassword.length >= 6) {
        sessionStorage.setItem('userPassword', newPassword);
        showNotification('Password changed successfully!');
    } else if (newPassword) {
        showNotification('Password must be at least 6 characters!');
    }
}

// Delete account
function deleteAccount() {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
        sessionStorage.clear();
        window.location.href = 'login.html';
    }
}

// Show notification
function showNotification(message) {
    const notification = document.getElementById('notification');
    if (notification) {
        notification.textContent = message;
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 2000);
    }
}

// Load profile on page load
window.addEventListener('load', function() {
    loadProfile();
});
