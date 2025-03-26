// 平滑滾動效果
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 導航欄滾動效果
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('navbar-scrolled');
    } else {
        navbar.classList.remove('navbar-scrolled');
    }
});

// 頁面加載動畫
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.6s ease-out';
    });

    setTimeout(() => {
        sections.forEach(section => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        });
    }, 200);
});

// 相簿功能
document.addEventListener('DOMContentLoaded', function() {
    // 相冊模態框事件處理
    const galleryModal = document.getElementById('galleryModal');
    const galleryGrid = document.getElementById('galleryGrid');
    
    galleryModal.addEventListener('show.bs.modal', function(event) {
        const button = event.relatedTarget;
        const folder = button.getAttribute('data-folder');
        const title = button.getAttribute('data-title') || button.querySelector('h3').textContent;
        
        // 更新模態框標題
        const modalTitle = galleryModal.querySelector('.modal-title');
        modalTitle.textContent = title;
        
        // 清空現有圖片
        galleryGrid.innerHTML = '';
        
        // 加載新圖片
        loadGalleryImages(folder);
    });
});

function getImageNumber(folder, index) {
    const imageMappings = {
        '親子教養講座': [78],
        '親子悅讀會': [66, 67, 69, 72, 73, 74, 75],
        '財商教育課程': [89, 91, 92, 93],
        '軟餐送暖活動': [172, 173, 174],
        '媽媽義工隊 軟餐製作工作坊': [159, 160, 161, 162, 163, 164, 165, 166, 167, 168],
        '飲茶之軟餐點心體驗活動': [177, 178, 180, 181],
        '二澳海岸齊清潔': [211, 212, 213, 214, 215, 216, 219, 220, 221],
        '可持續發展嘉年華環保推廣': [198, 199, 200, 202, 203],
        '綠色校園．廚餘轉化先導計劃': [188, 189, 190, 192, 193, 194, 195],
        '升小情緒管理及趣味工作坊': [143, 144, 145],
        '抗疫情緒管理之多元藝術工作坊': [96, 101, 105, 108, 109, 112],
        '關愛家國安全共享': [228, 232, 233],
        '國慶主題社區比賽及工作坊': [150, 152, 153, 154, 155],
        '過往活動花絮': [60, 61, 62, 63, 225],
        '電視台訪問': [126, 127],
        '創辦人媒體訪問': [32, 36, 37]
    };
    
    return imageMappings[folder][index - 1];
}

function loadGalleryImages(folder) {
    const galleryGrid = document.getElementById('galleryGrid');
    
    // 根據文件夾名稱加載對應的圖片
    const imageMappings = {
        '親子教養講座': [78],
        '親子悅讀會': [66, 67, 69, 72, 73, 74, 75],
        '財商教育課程': [89, 91, 92, 93],
        '軟餐送暖活動': [172, 173, 174],
        '媽媽義工隊 軟餐製作工作坊': [159, 160, 161, 162, 163, 164, 165, 166, 167, 168],
        '飲茶之軟餐點心體驗活動': [177, 178, 180, 181],
        '二澳海岸齊清潔': [211, 212, 213, 214, 215, 216, 219, 220, 221],
        '可持續發展嘉年華環保推廣': [198, 199, 200, 202, 203],
        '綠色校園．廚餘轉化先導計劃': [188, 189, 190, 192, 193, 194, 195],
        '升小情緒管理及趣味工作坊': [143, 144, 145],
        '抗疫情緒管理之多元藝術工作坊': [96, 101, 105, 108, 109, 112],
        '關愛家國安全共享': [228, 232, 233],
        '國慶主題社區比賽及工作坊': [150, 152, 153, 154, 155],
        '過往活動花絮': [60, 61, 62, 63, 225],
        '電視台訪問': [126, 127],
        '創辦人媒體訪問': [32, 36, 37]
    };
    
    const images = imageMappings[folder] || [];
    
    images.forEach((imgNumber, index) => {
        const img = document.createElement('img');
        img.src = `images/${folder}/img${imgNumber}.jpg`;
        img.alt = `${folder} - 圖片 ${index + 1}`;
        img.className = 'gallery-item';
        img.onclick = function() {
            showFullImage(this.src);
        };
        galleryGrid.appendChild(img);
    });
}

function showFullImage(src) {
    // 創建全屏圖片查看器
    const viewer = document.createElement('div');
    viewer.className = 'image-viewer';
    viewer.innerHTML = `
        <div class="viewer-content">
            <img src="${src}" alt="全屏圖片">
            <button class="close-viewer">&times;</button>
        </div>
    `;
    
    document.body.appendChild(viewer);
    
    // 點擊關閉按鈕或背景關閉查看器
    viewer.addEventListener('click', function(e) {
        if (e.target === viewer || e.target.className === 'close-viewer') {
            viewer.remove();
        }
    });
} 