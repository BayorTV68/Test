// ========== FIXED UYEH TECH - SETTINGS PAGE JAVASCRIPT ==========
// This version properly connects to your backend API

const API_URL = 'http://localhost:3000';

// ========== INITIALIZE PAGE ==========
document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
    loadUserData();
    initializeEventListeners();
    console.log('✅ Settings page initialized');
});

// ========== CHECK AUTHENTICATION ==========
function checkAuth() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'login.html';
        return null;
    }
    return token;
}

// ========== LOAD USER DATA (Server-Only) ==========
async function loadUserData() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'login.html';
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/api/profile`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        const data = await response.json();
        
        if (data.success && data.user) {
            displayUserData(data.user);
        } else {
            showNotification('❌ Failed to load user profile from server.', 'error');
            console.error('API failed to load user data:', data.message || 'Unknown error');
        }
        
    } catch (error) {
        console.error('Error fetching profile:', error);
        showNotification('❌ Network error: Could not connect to server.', 'error');
    }
}

// ========== DISPLAY USER DATA ==========
function displayUserData(user) {
    // Profile Information
    document.getElementById('fullName').value = user.name || '';
    document.getElementById('email').value = user.email || '';
    // Note: Backend doesn't have phone/country fields currently
    
    // Profile Avatar
    const avatarElement = document.getElementById('currentAvatar');
    if (user.profileImage) {
        avatarElement.innerHTML = `<img src="${user.profileImage}" alt="Profile">`;
    } else {
        const initial = (user.name || 'U').charAt(0).toUpperCase();
        avatarElement.textContent = initial;
    }
    
    // Account Information
    const verifiedBadge = document.getElementById('verifiedBadge');
    if (user.emailVerified) {
        verifiedBadge.textContent = '✓ Verified';
        verifiedBadge.style.background = 'rgba(0, 255, 136, 0.2)';
        verifiedBadge.style.color = '#00ff88';
    } else {
        verifiedBadge.textContent = '⚠️ Not Verified';
        verifiedBadge.style.background = 'rgba(255, 165, 0, 0.2)';
        verifiedBadge.style.color = '#ffa500';
    }
    
    if (user.createdAt) {
        const date = new Date(user.createdAt);
        document.getElementById('memberSince').textContent = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
    
    // Load order count from API
    loadOrderCount();
}

// ========== LOAD ORDER COUNT ==========
async function loadOrderCount() {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/api/orders`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        const data = await response.json();
        if (data.success) {
            document.getElementById('totalPurchases').textContent = 
                `${data.count || 0} order${data.count !== 1 ? 's' : ''}`;
        }
    } catch (error) {
        console.error('Error loading orders:', error);
        document.getElementById('totalPurchases').textContent = '0 orders';
    }
}

// ========== INITIALIZE EVENT LISTENERS ==========
function initializeEventListeners() {
    document.getElementById('mobileMenuBtn').addEventListener('click', toggleSidebar);
    document.getElementById('logoutBtn').addEventListener('click', logout);
    
    // Tab switching
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            switchTab(this.dataset.tab);
        });
    });
    
    // Profile form
    document.getElementById('profileForm').addEventListener('submit', updateProfile);
    document.getElementById('resetProfileBtn').addEventListener('click', loadUserData);
    document.getElementById('profilePictureInput').addEventListener('change', handleProfilePictureChange);
    
    // Password form
    document.getElementById('passwordForm').addEventListener('submit', changePassword);
    document.getElementById('newPassword').addEventListener('input', checkPasswordStrength);
    
    // Payment methods - Show message that these need backend implementation
    document.getElementById('showAddPaymentBtn').addEventListener('click', showPaymentMethodMessage);
    
    // Notification toggles - Show message
    const notificationToggles = document.querySelectorAll('.notification-toggle');
    notificationToggles.forEach(toggle => {
        toggle.addEventListener('change', function() {
            showNotification('⚠️ Notification settings require backend implementation', 'info');
        });
    });
    
    // 2FA toggle - Show message
    document.getElementById('twoFactorToggle').addEventListener('change', function() {
        this.checked = false; // Revert
        showNotification('⚠️ 2FA requires backend implementation', 'info');
    });
    
    // Delete account
    document.getElementById('deleteAccountBtn').addEventListener('click', deleteAccount);
}

// ========== TAB SWITCHING ==========
function switchTab(tabName) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.settings-panel').forEach(panel => panel.classList.remove('active'));
    
    const selectedTab = document.querySelector(`[data-tab="${tabName}"]`);
    const selectedPanel = document.getElementById(`${tabName}-panel`);
    
    if (selectedTab && selectedPanel) {
        selectedTab.classList.add('active');
        selectedPanel.classList.add('active');
    }
}

// ========== UPDATE PROFILE (Fixed to match backend) ==========
async function updateProfile(e) {
    e.preventDefault();
    
    const saveBtn = document.getElementById('saveProfileBtn');
    const originalText = saveBtn.innerHTML;
    saveBtn.disabled = true;
    saveBtn.innerHTML = '<span class="spinner"></span> Saving...';
    
    const profileData = {
        fullName: document.getElementById('fullName').value,
        // Backend doesn't support email/phone/country updates yet
        // You'll need to add these fields to your backend User schema
    };
    
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/api/profile`, { // Fixed: Use /api/profile not /update
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(profileData)
        });
        
        const data = await response.json();
        
        if (data.success) {
            showNotification('✅ Profile updated successfully!', 'success');
            displayUserData(data.user);
        } else {
            showNotification('❌ ' + (data.message || 'Failed to update profile'), 'error');
        }
        
    } catch (error) {
        console.error('Error updating profile:', error);
        showNotification('❌ Error connecting to server. Profile not updated.', 'error');
    } finally {
        saveBtn.disabled = false;
        saveBtn.innerHTML = originalText;
    }
}

// ========== HANDLE PROFILE PICTURE CHANGE ==========
function handleProfilePictureChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    if (file.size > 5 * 1024 * 1024) {
        showNotification('❌ File size must be less than 5MB', 'error');
        return;
    }
    
    if (!file.type.startsWith('image/')) {
        showNotification('❌ Please select an image file', 'error');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = async function(event) {
        const imageData = event.target.result;
        
        // Update preview immediately
        const avatarElement = document.getElementById('currentAvatar');
        avatarElement.innerHTML = `<img src="${imageData}" alt="Profile">`;
        
        // Upload to server using the profile endpoint with profileImage field
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/api/profile`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ profileImage: imageData })
            });
            
            const data = await response.json();
            
            if (data.success) {
                showNotification('✅ Profile picture updated!', 'success');
            } else {
                loadUserData(); // Revert on failure
                showNotification('❌ Failed to upload picture.', 'error');
            }
            
        } catch (error) {
            console.error('Error uploading picture:', error);
            loadUserData();
            showNotification('❌ Error connecting to server.', 'error');
        }
    };
    
    reader.readAsDataURL(file);
}

// ========== CHANGE PASSWORD (Already correct) ==========
async function changePassword(e) {
    e.preventDefault();
    
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (newPassword !== confirmPassword) {
        showNotification('❌ Passwords do not match!', 'error');
        return;
    }
    
    if (newPassword.length < 8) {
        showNotification('❌ Password must be at least 8 characters long', 'error');
        return;
    }
    
    const changeBtn = document.getElementById('changePasswordBtn');
    const originalText = changeBtn.innerHTML;
    changeBtn.disabled = true;
    changeBtn.innerHTML = '<span class="spinner"></span> Changing...';
    
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/api/auth/change-password`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ currentPassword, newPassword })
        });
        
        const data = await response.json();
        
        if (data.success) {
            showNotification('✅ Password changed successfully!', 'success');
            document.getElementById('passwordForm').reset();
            document.getElementById('passwordStrengthBar').style.width = '0%';
            document.getElementById('passwordStrengthText').textContent = '';
        } else {
            showNotification('❌ ' + (data.message || 'Failed to change password'), 'error');
        }
        
    } catch (error) {
        console.error('Error changing password:', error);
        showNotification('❌ Error connecting to server.', 'error');
    } finally {
        changeBtn.disabled = false;
        changeBtn.innerHTML = originalText;
    }
}

// ========== CHECK PASSWORD STRENGTH ==========
function checkPasswordStrength() {
    const password = document.getElementById('newPassword').value;
    const strengthBar = document.getElementById('passwordStrengthBar');
    const strengthText = document.getElementById('passwordStrengthText');
    
    if (password.length === 0) {
        strengthBar.style.width = '0%';
        strengthText.textContent = '';
        return;
    }
    
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (password.length >= 12) strength += 25;
    if (/[a-z]/.test(password)) strength += 15;
    if (/[A-Z]/.test(password)) strength += 15;
    if (/[0-9]/.test(password)) strength += 10;
    if (/[^a-zA-Z0-9]/.test(password)) strength += 10;
    
    strengthBar.style.width = strength + '%';
    
    if (strength < 40) {
        strengthBar.style.background = '#ff4444';
        strengthText.textContent = 'Weak password';
        strengthText.style.color = '#ff4444';
    } else if (strength < 70) {
        strengthBar.style.background = '#ffa500';
        strengthText.textContent = 'Medium strength';
        strengthText.style.color = '#ffa500';
    } else {
        strengthBar.style.background = '#00ff88';
        strengthText.textContent = 'Strong password';
        strengthText.style.color = '#00ff88';
    }
}

// ========== SHOW PAYMENT METHOD MESSAGE ==========
function showPaymentMethodMessage() {
    showNotification('⚠️ Payment method management requires backend API implementation', 'info');
}

// ========== DELETE ACCOUNT ==========
async function deleteAccount() {
    const confirmed = confirm(
        '⚠️ WARNING: This will permanently delete your account and all data. This cannot be undone.\n\nAre you sure?'
    );
    
    if (!confirmed) return;
    
    const doubleConfirm = prompt('Type "DELETE" to confirm:');
    if (doubleConfirm !== 'DELETE') {
        showNotification('❌ Account deletion cancelled', 'info');
        return;
    }
    
    showNotification('⚠️ Account deletion requires backend implementation', 'info');
}

// ========== UTILITY FUNCTIONS ==========
function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('active');
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('token');
        showNotification('👋 Logged out successfully', 'success');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 500);
    }
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    
    const colors = {
        success: 'linear-gradient(135deg, #00b359, #00ff88)',
        error: 'linear-gradient(135deg, #ff4444, #ff6666)',
        info: 'linear-gradient(135deg, #4a90e2, #5ba3f5)'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 30px;
        right: 30px;
        background: ${colors[type] || colors.info};
        color: white;
        padding: 18px 25px;
        border-radius: 12px;
        font-weight: 600;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        max-width: 400px;
        font-family: 'Montserrat', sans-serif;
        animation: slideIn 0.3s ease;
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(400px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(400px)';
        notification.style.transition = 'all 0.3s ease';
        setTimeout(() => {
            notification.remove();
            style.remove();
        }, 300);
    }, 4000);
}

window.addEventListener('resize', function() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar && window.innerWidth > 968) {
        sidebar.classList.remove('active');
    }
});