window.onload = function () {

    const menu = document.getElementById('menu');
    const layout = document.getElementById('layout');
    const menuProfile = document.getElementById('menuProfile');
    const menuHobbies = document.getElementById('menuHobbies');
    const menuTrainings = document.getElementById('menuTrainings')
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

    let layoutWidth = window.innerWidth;

    // Calculate the height of the pages according to the height of the menu.
    layout.style.height = getComputedStyle(menu).height;

    // Add the arrow at the loading of Profile page.
    scrollHint.classList.add('arrow');

    // Calculate width to know if we are on phone or not.
    window.addEventListener('resize', function () {
        layoutWidth = window.innerWidth;
        layout.style.height = getComputedStyle(menu).height;

        // Fix borders bug when responsive mode.
        if (layoutWidth > 640 && menuHobbies.classList.contains('selected')) {
            menuHobbies.classList.remove('bottom-border');
        }
        else {
            menuHobbies.classList.add('bottom-border');
        }

        if (layoutWidth < 640 && menuProfile.classList.contains('unselected')) {
            menuProfile.classList.add('left-border');
        } else if (layoutWidth < 640 && menuProfile.classList.contains('selected')) {
            menuProfile.classList.remove('left-border');
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

            // Fix borders of the Mobile menu.
            if (this.id === 'menuProfile') {
                if (layoutWidth < 640) {
                    menuProfile.classList.remove('left-border');
                }
            } else {
                if (layoutWidth < 640) {
                    menuProfile.classList.add('left-border');
                }
            }

            // Fix borders of the PC menu.
            if (layoutWidth > 640) {
                if (this.id === 'menuHobbies') {
                    console.log("test")
                    menuHobbies.classList.remove('bottom-border');
                    menuTrainings.classList.add('bottom-border');
                } else {
                    menuTrainings.classList.remove('bottom-border');
                    menuHobbies.classList.add('bottom-border');

                }
            }

            // Add or remove the arrow at the bottom of Skills page when entering or leaving the page.
            if (this.id === 'menuSkills' || this.id === 'menuProfile' && layoutWidth < 640) {
                scrollHint.classList.add('arrow');
            }
            else {
                scrollHint.classList.remove('arrow');
                scrollHint.classList.remove('end-arrow');
            }

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
