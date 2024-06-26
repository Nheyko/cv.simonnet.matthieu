const menu = document.getElementById('menu');
const layout = document.getElementById('layout');
const menuProfile = document.getElementById('menuProfile');
const menuSkills = document.getElementById('menuSkills');
const menuProjects = document.getElementById('menuProjects');
const menuTrainings = document.getElementById('menuTrainings');
const menuHobbies = document.getElementById('menuHobbies');
const scrollHint = document.getElementById('scrollHint');
const layoutInner = document.getElementById('layoutInner');

const menus = [
    document.getElementById('menuProfile'),
    document.getElementById('menuSkills'),
    document.getElementById('menuProjects'),
    document.getElementById('menuTrainings'),
    document.getElementById('menuHobbies')
];

const pages = [
    document.getElementById('profile'),
    document.getElementById('skills'),
    document.getElementById('projects'),
    document.getElementById('trainings'),
    document.getElementById('hobbies')
]

window.onload = function () {

    // Calculate the width of the pages when the page is loaded.
    let layoutWidth = window.innerWidth;

    // Calculate the height of the pages according to the height of the menu when the page is loaded.
    let menuHeight = Math.ceil(parseFloat(getComputedStyle(menu).height));
    layout.style.height = (menuHeight - 1) + 'px';

    if (menuProfile.classList.contains('selected') && isOverflowing(layoutInner)) {
        // Add the arrow at the loading of Profile page if there is overflow.
        scrollHint.classList.add('arrow');
    }

    // Calculate width to know if we are on phone or not.
    window.addEventListener('resize', function () {

        // Add the arrow at the resize of page if there is overflow.
        if (isOverflowing(layoutInner)) {
            // Set the scroll bar at the top when changing page.
            layoutInner.scrollTop = 0;
            scrollHint.classList.add('arrow');
        }
        else {
            scrollHint.classList.remove('arrow');
            scrollHint.classList.remove('end-arrow');
        }

        // Calculate the width of the pages when the page is loaded.
        layoutWidth = window.innerWidth;
        menuHeight = Math.ceil(parseFloat(getComputedStyle(menu).height));

        // Calculate the height of the pages according to the height of the menu when the page is resized.
        if (layoutWidth < 640) {
            layout.style.height = (menuHeight) + 'px';
        } else if (!menuHobbies.classList.contains('selected')) {
            layout.style.height = (menuHeight - 1) + 'px';
        } else {
            layout.style.height = (menuHeight) + 'px';
        }
    });

    // Calculate the size of the scrollbar to replace the arrow css with end-arrow css.
    layoutInner.onscroll = function () {
        const scrollHeight = layoutInner.scrollHeight;
        const scrollTop = layoutInner.scrollTop;
        const clientHeight = layoutInner.clientHeight;

        if (scrollTop + clientHeight >= scrollHeight - 1) {
            scrollHint.classList.replace('arrow', 'end-arrow');
        }
        else {
            scrollHint.classList.replace('end-arrow', 'arrow');
        }
    }

    menus.forEach((menuItem) => {

        menuItem.addEventListener('click', function () {

            menus.forEach((item) => {
                item.classList.remove('selected');
                item.classList.add('unselected');
            });

            // Fix borders of the PC menu.
            if (this.id === 'menuHobbies') {
                menuHobbies.classList.remove('bottom-border');
            } else {
                menuHobbies.classList.add('bottom-border');
            }

            // Adjust buttons border for mobile version.
            if (this.id === 'menuProfile') {
                menuProfile.classList.remove('left-border');
            } else {
                menuProfile.classList.add('left-border');
            }
            if (this.id === 'menuSkills') {
                menuProfile.classList.add('remove-right-border');
            } else {
                menuProfile.classList.remove('remove-right-border');
            }
            if (this.id === 'menuProjects') {
                menuSkills.classList.add('remove-right-border');
            } else {
                menuSkills.classList.remove('remove-right-border');
            }
            if (this.id === 'menuTrainings') {
                menuProjects.classList.add('remove-right-border');
            } else {
                menuProjects.classList.remove('remove-right-border');
            }
            if (this.id === 'menuHobbies') {
                menuTrainings.classList.add('remove-right-border');
            } else {
                menuTrainings.classList.remove('remove-right-border');
            }

            // Add or remove the arrow at the bottom of Skills page when entering or leaving the page.
            // Added Timeout so it directly detect when we click on another page.
            setTimeout(function () {
                if (isOverflowing(layoutInner)) {
                    // Set the scroll bar at the top when changing page.
                    layoutInner.scrollTop = 0;
                    scrollHint.classList.add('arrow');
                }
                else {
                    scrollHint.classList.remove('arrow');
                    scrollHint.classList.remove('end-arrow');
                }
            }, 0);

            // Hide all pages.
            pages.forEach((page) => {
                page.classList.add('hide');
            });

            // Determine which page to show.
            let pageToShowId;
            switch (this.id) {
                case 'menuProfile':
                    pageToShowId = 'profile';
                    break;
                case 'menuSkills':
                    pageToShowId = 'skills';
                    break;
                case 'menuProjects':
                    pageToShowId = 'projects';
                    break;
                case 'menuTrainings':
                    pageToShowId = 'trainings';
                    break;
                case 'menuHobbies':
                    pageToShowId = 'hobbies';
                    break;
                default:
                    pageToShowId = 'profile';
            }

            // Show the determined page.
            const pageToShow = document.getElementById(pageToShowId);
            pageToShow.classList.remove('hide');

            this.classList.remove('unselected');
            this.classList.add('selected');
        });
    });
}

// Detect if a page has overflowing in it.
function isOverflowing(element) {
    return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
}