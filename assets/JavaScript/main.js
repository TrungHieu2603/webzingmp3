document.addEventListener('DOMContentLoaded', function() {
    const iconSetting = document.querySelector('.icon-setting');
    const menuSetting = document.querySelector('.menu-setting');

    const userBtn = document.querySelector('.user-btn');
    const menuUser = document.querySelector('.menu-user');

    let currentSlide = 0; // Biến lưu trữ vị trí slide hiện tại
    const totalItems = 9; // Tổng số item có
    const itemsPerPage = 3; // Số item hiển thị mỗi lần

    // Đảm bảo ẩn cả menu-user và menu-setting khi tải trang
    menuSetting.style.display = 'none';
    menuUser.style.display = 'none';

    // Toggle hiển thị menu-setting khi click vào icon-setting
    iconSetting.addEventListener('click', function(event) {
        event.stopPropagation(); // Ngăn sự kiện click truyền lên các phần tử cha

        // Kiểm tra nếu menu-user đang hiển thị thì ẩn nó đi
        if (menuUser.style.display === 'block') {
            menuUser.style.display = 'none';
        }

        // Toggle hiển thị menu-setting
        const isMenuSettingVisible = menuSetting.style.display === 'block';
        menuSetting.style.display = isMenuSettingVisible ? 'none' : 'block';
    });

    // Toggle hiển thị menu-user khi click vào user-btn
    userBtn.addEventListener('click', function(event) {
        event.stopPropagation(); // Ngăn sự kiện click truyền lên các phần tử cha

        // Kiểm tra nếu menu-setting đang hiển thị thì ẩn nó đi
        if (menuSetting.style.display === 'block') {
            menuSetting.style.display = 'none';
        }

        // Toggle hiển thị menu-user
        const isMenuUserVisible = menuUser.style.display === 'block';
        menuUser.style.display = isMenuUserVisible ? 'none' : 'block';
    });

    // Ẩn cả menu-setting và menu-user khi click ra ngoài
    document.addEventListener('click', function() {
        menuSetting.style.display = 'none'; // Ẩn menu-setting
        menuUser.style.display = 'none'; // Ẩn menu-user
    });

    // Ngăn không ẩn menu-user khi click bên trong menu-user
    menuUser.addEventListener('click', function(event) {
        event.stopPropagation();
    });

    // Ngăn không ẩn menu-setting khi click bên trong menu-setting
    menuSetting.addEventListener('click', function(event) {
        event.stopPropagation();
    });

    // Hàm hiển thị các slide
    function showSlides() {
        const sliderItems = document.querySelector('.slider-list'); // Lấy danh sách các slide
        const slideWidth = document.querySelector('.section-slider-item').offsetWidth; // Lấy chiều rộng của một slide
        const newTransform = -currentSlide * slideWidth; // Tính toán vị trí mới
        sliderItems.style.transform = `translateX(${newTransform}px)`; // Thay đổi vị trí của danh sách slide

        // Cập nhật trạng thái của các nút
        updateButtons();
    }

    // Hàm để chuyển tới slide tiếp theo
    function nextSlide() {
        if (currentSlide < totalItems - itemsPerPage) { // Kiểm tra xem có thể chuyển tới slide tiếp theo không
            currentSlide += itemsPerPage; // Cập nhật vị trí slide hiện tại
            showSlides(); // Hiển thị các slide mới
        }
    }

    // Hàm để quay lại slide trước
    function prevSlide() {
        if (currentSlide > 0) { // Kiểm tra xem có thể quay lại slide trước không
            currentSlide -= itemsPerPage; // Cập nhật vị trí slide hiện tại
            showSlides(); // Hiển thị các slide mới
        }
    }

    // Hàm để cập nhật trạng thái của các nút
    function updateButtons() {
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');

        // Nếu ở vị trí đầu tiên, vô hiệu hóa nút "prev"
        if (currentSlide === 0) {
            prevBtn.disabled = true;
        } else {
            prevBtn.disabled = false;
        }

        // Nếu ở vị trí cuối cùng, vô hiệu hóa nút "next"
        if (currentSlide >= totalItems - itemsPerPage) {
            nextBtn.disabled = true;
        } else {
            nextBtn.disabled = false;
        }
    }

    // Gán sự kiện click cho các nút
    document.getElementById('prevBtn').addEventListener('click', prevSlide); // Gán sự kiện cho nút quay lại
    document.getElementById('nextBtn').addEventListener('click', nextSlide); // Gán sự kiện cho nút tiếp theo

    // Khởi tạo ban đầu
    showSlides(); // Hiển thị các slide ban đầu
});
