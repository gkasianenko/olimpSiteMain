const mobileMenuGroups = document.querySelectorAll('.list-group');
const mobileMenuHeaders = document.querySelectorAll('.list-group__header');

mobileMenuHeaders.forEach((group) => {
    group.addEventListener('click', toggleAcordeon);
})

window.addEventListener("DOMContentLoaded", function () {
    if(window.innerWidth < 575) {
        const mobileMenuContent = mobileMenuHeaders
        mobileMenuGroups.forEach((group) => {
            group.querySelector('.list-content').classList.add('hide');
            
        });
    }
    });

    window.addEventListener("resize", function () {
        if(window.innerWidth < 575) {
            const mobileMenuContent = mobileMenuHeaders
            mobileMenuGroups.forEach((group) => {
                group.querySelector('.list-content').classList.add('hide');
                
            });
        } else {
            mobileMenuGroups.forEach((group) => {
                group.querySelector('.list-content').classList.remove('hide');
            });
        };
        });
   

        function toggleAcordeon(event){

            const parentElement = event.target.closest(".list-group");
            const hiddenContent = parentElement.querySelector(".list-content");
            const listGroupHeader = parentElement.querySelector('.list-group__header');

            hiddenContent.classList.toggle("active");
            listGroupHeader.querySelector('.list-icon').classList.toggle("active");
        
        }