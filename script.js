document.addEventListener('DOMContentLoaded', function () {
    // Pagination elements
    const nextPageBtn = document.getElementById('next-page');
    const prevPageBtn = document.getElementById('prev-page');
    const pageIndicator = document.getElementById('page-indicator');

    // Project page elements
    const projectPages = document.querySelectorAll('.projects-section');
    const totalPages = projectPages.length;

    let currentPage = 1;

    // Initialize buttons state
    updatePaginationControls();

    // Add event listeners for navigation buttons
    nextPageBtn.addEventListener('click', function () {
        if (currentPage < totalPages) {
            projectPages[currentPage - 1].classList.add('hidden');
            currentPage++;
            projectPages[currentPage - 1].classList.remove('hidden');
            updatePaginationControls();
        }
    });

    prevPageBtn.addEventListener('click', function () {
        if (currentPage > 1) {
            projectPages[currentPage - 1].classList.add('hidden');
            currentPage--;
            projectPages[currentPage - 1].classList.remove('hidden');
            updatePaginationControls();
        }
    });

    // Update the state of pagination controls based on current page
    function updatePaginationControls() {
        pageIndicator.textContent = `Page ${currentPage}`;

        // Disable/enable prev button
        prevPageBtn.disabled = (currentPage === 1);

        // Disable/enable next button
        nextPageBtn.disabled = (currentPage === totalPages);
    }
});
