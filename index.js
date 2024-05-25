window.onload = function () {

    const menu = document.getElementById('menu');
    const layout = document.getElementById('layout');
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

            this.classList.remove('unselected');
            this.classList.add('selected');

            // Fix borders of the menu.
            if (this.id === 'menuHobbies') {
                menuHobbies.classList.remove('bottom-border');
                menuTrainings.classList.add('bottom-border');
            } else {
                menuHobbies.classList.add('bottom-border');
                menuTrainings.classList.remove('bottom-border');
            }

            // Add or remove the arrow at the bottom of Skills page when entering or leaving the page.
            if (this.id === 'menuSkills') {
                scrollHint.classList.add('arrow');
                scrollHint.classList.add('down');
            }
            else {
                scrollHint.classList.remove('arrow');
                scrollHint.classList.remove('end-arrow');
                scrollHint.classList.remove('down');
            }

            // switch (this.id) {
            //     case 'menuProfile':
            //         pages.forEach((page) => {
            //             page.classList.remove('display');
            //             page.classList.add('hide');
            //         })
            //         document.getElementById('profile').classList.remove('hide');
            //         document.getElementById('profile').classList.add('display');
            //         break;

            //     case 'menuSkills':
            //         pages.forEach((page) => {
            //             page.classList.remove('display');
            //             page.classList.add('hide');
            //         })
            //         document.getElementById('skills').classList.remove('hide');
            //         document.getElementById('skills').classList.add('display');
            //         break;

            //     case 'menuProjects':
            //         pages.forEach((page) => {
            //             page.classList.remove('display');
            //             page.classList.add('hide');
            //         })
            //         document.getElementById('projects').classList.remove('hide');
            //         document.getElementById('projects').classList.add('display');
            //         break;

            //     case 'menuTrainings':
            //         pages.forEach((page) => {
            //             page.classList.remove('display');
            //             page.classList.add('hide');
            //         })
            //         document.getElementById('trainings').classList.remove('hide');
            //         document.getElementById('trainings').classList.add('display');
            //         break;

            //     case 'menuHobbies':
            //         pages.forEach((page) => {
            //             page.classList.remove('display');
            //             page.classList.add('hide');
            //         })
            //         document.getElementById('hobbies').classList.remove('hide');
            //         document.getElementById('hobbies').classList.add('display');
            //         break;

            //     default:
            //         pages.forEach((page) => {
            //             page.classList.remove('display');
            //             page.classList.add('hide');
            //         })
            //         document.getElementById('profile').classList.remove('hide');
            //         document.getElementById('profile').classList.add('display');
            // }

            // Refactored
            // Hide all pages

            pages.forEach((page) => {
                page.classList.add('hide');
            });

            // Determine which page to show
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

            // Show the determined page
            const pageToShow = document.getElementById(pageToShowId);
            pageToShow.classList.remove('hide');

            this.classList.remove('unselected');
            this.classList.add('selected');
        });
    });

    // Adjust the height of the layout depending of the menu height
    layout.style.height = getComputedStyle(menu).height;
}
