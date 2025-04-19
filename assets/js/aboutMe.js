document.addEventListener('DOMContentLoaded', function() {
    const profilePhoto = document.querySelector('.profile-photo');
    if (profilePhoto) {
        setTimeout(() => {
            profilePhoto.style.opacity = '1';
            profilePhoto.style.transform = 'scale(1)';
        }, 300);
    }

    const infoItems = document.querySelectorAll('.info-item');
    infoItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.querySelector('div').style.transform = 'rotate(10deg)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.querySelector('div').style.transform = 'rotate(0)';
        });
    });
});